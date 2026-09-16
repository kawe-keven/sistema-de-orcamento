import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { QUOTE_REPOSITORY, QuoteRepository } from '../../domain/quotes/quote-repository.port';

@Injectable()
export class ListQuotesUseCase {
  constructor(@Inject(QUOTE_REPOSITORY) private readonly quotes: QuoteRepository) {}
  execute(userId: string) { return this.quotes.listByUser(userId); }
}
