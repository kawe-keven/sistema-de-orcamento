import { Injectable, NotFoundException } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class RespondToQuoteUseCase {
  constructor(private readonly prisma: PrismaService) {}
  async execute(token: string, status: 'APPROVED' | 'DECLINED', signerName: string, document: string) {
    const quote = await this.prisma.quote.findFirst({ where: { publicTokenHash: createHash('sha256').update(token).digest('hex'), publicTokenExpiresAt: { gt: new Date() } } });
    if (!quote) throw new NotFoundException('Proposta não encontrada ou expirada.');
    const updated = await this.prisma.quote.update({ where: { id: quote.id }, data: { status } });
    await this.prisma.auditLog.create({ data: { quoteId: quote.id, action: `QUOTE_${status}`, metadata: { signerName, document } } });
    return updated;
  }
}
