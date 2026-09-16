import { Injectable } from '@nestjs/common';
import { QuoteEntity, QuoteLine } from '../../domain/quotes/quote.entity';
import { Money } from '../../domain/quotes/money.value-object';
import { PUBLIC_TOKEN_PORT, PublicTokenPort } from '../../domain/quotes/public-token.port';
import { QUOTE_REPOSITORY, QuoteRepository } from '../../domain/quotes/quote-repository.port';
import { AUDIT_PORT, AuditPort } from '../../domain/audit/audit.port';
import { Inject } from '@nestjs/common';

export type CreateQuoteCommand = { userId: string; clientName: string; clientEmail: string; project: string; description: string; items: QuoteLine[]; discount: number; tax: number };
@Injectable()
export class CreateQuoteUseCase {
  constructor(@Inject(QUOTE_REPOSITORY) private readonly quotes: QuoteRepository, @Inject(PUBLIC_TOKEN_PORT) private readonly tokens: PublicTokenPort, @Inject(AUDIT_PORT) private readonly audit: AuditPort) {}
  async execute(command: CreateQuoteCommand) {
    const entity = new QuoteEntity(command.items, Money.from(command.discount), Money.from(command.tax));
    const token = this.tokens.issue();
    const client = await this.quotes.upsertClient(command.clientName, command.clientEmail);
    const quote = await this.quotes.create({ userId: command.userId, clientId: client.id, project: command.project, description: command.description, items: command.items, subtotal: entity.subtotal().amount, discount: command.discount, tax: command.tax, total: entity.total().amount, publicTokenHash: token.digest, publicTokenExpiresAt: token.expiresAt });
    await this.audit.record({ userId: command.userId, quoteId: quote.id, action: 'QUOTE_CREATED' });
    return { quote, publicToken: token.raw };
  }
}
