import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { PUBLIC_TOKEN_PORT, PublicTokenPort } from '../../domain/quotes/public-token.port';
import { assertPublicResponseAllowed } from './quote-status.policy';
import { QUOTE_REPOSITORY, QuoteRepository } from '../../domain/quotes/quote-repository.port';
import { AUDIT_PORT, AuditPort } from '../../domain/audit/audit.port';

@Injectable()
export class RespondToQuoteUseCase {
  constructor(@Inject(QUOTE_REPOSITORY) private readonly quotes: QuoteRepository, @Inject(PUBLIC_TOKEN_PORT) private readonly tokens: PublicTokenPort, @Inject(AUDIT_PORT) private readonly audit: AuditPort) {}
  async execute(token: string, status: 'APPROVED' | 'DECLINED', signerName: string, document: string) {
    const quote = await this.quotes.findPublic(this.tokens.digest(token), new Date());
    if (!quote) throw new NotFoundException('Proposta não encontrada ou expirada.');
    assertPublicResponseAllowed(quote.status);
    const updated = await this.quotes.updateResponse(quote.id, status, new Date());
    await this.audit.record({ quoteId: quote.id, action: `QUOTE_${status}`, metadata: { signerName, document } });
    return updated;
  }
}
