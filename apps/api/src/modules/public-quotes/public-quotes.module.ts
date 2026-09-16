import { Module } from '@nestjs/common';
import { RespondToQuoteUseCase } from '../../application/quotes/respond-to-quote.use-case';
import { PublicQuotesController } from './public-quotes.controller';
@Module({ controllers: [PublicQuotesController], providers: [RespondToQuoteUseCase] })
export class PublicQuotesModule {}
