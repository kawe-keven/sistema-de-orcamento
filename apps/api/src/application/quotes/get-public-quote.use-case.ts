import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PUBLIC_TOKEN_PORT, PublicTokenPort } from '../../domain/quotes/public-token.port';
import { QUOTE_REPOSITORY, QuoteRepository } from '../../domain/quotes/quote-repository.port';

@Injectable()
export class GetPublicQuoteUseCase {
  constructor(@Inject(QUOTE_REPOSITORY) private readonly quotes: QuoteRepository, @Inject(PUBLIC_TOKEN_PORT) private readonly tokens: PublicTokenPort) {}
  async execute(rawToken: string) {
    const quote = await this.quotes.findPublic(this.tokens.digest(rawToken), new Date());
    if (!quote) throw new NotFoundException('Proposta não encontrada ou expirada.');
    return { id: quote.id, clientName: quote.client.name, project: quote.project, description: quote.description, items: quote.items, subtotal: Number(quote.subtotal), discount: Number(quote.discount), tax: Number(quote.tax), total: Number(quote.total), expiresAt: quote.publicTokenExpiresAt, status: quote.status };
  }
}
