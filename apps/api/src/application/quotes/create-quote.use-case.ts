import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { QuoteEntity, QuoteLine } from '../../domain/quotes/quote.entity';
import { Money } from '../../domain/quotes/money.value-object';

export type CreateQuoteCommand = { userId: string; clientName: string; clientEmail: string; project: string; description: string; items: QuoteLine[]; discount: number; tax: number };
@Injectable()
export class CreateQuoteUseCase {
  constructor(private readonly prisma: PrismaService) {}
  async execute(command: CreateQuoteCommand) {
    const entity = new QuoteEntity(command.items, Money.from(command.discount), Money.from(command.tax));
    const token = randomBytes(32).toString('base64url');
    const client = await this.prisma.client.upsert({ where: { email: command.clientEmail }, update: { name: command.clientName }, create: { name: command.clientName, email: command.clientEmail } });
    return this.prisma.quote.create({ data: { userId: command.userId, clientId: client.id, project: command.project, description: command.description, items: command.items, subtotal: entity.subtotal().amount, discount: command.discount, tax: command.tax, total: entity.total().amount, publicTokenHash: createHash('sha256').update(token).digest('hex'), publicTokenExpiresAt: new Date(Date.now() + 30 * 86400000) }, include: { client: true } }).then(quote => ({ quote, publicToken: token }));
  }
}
