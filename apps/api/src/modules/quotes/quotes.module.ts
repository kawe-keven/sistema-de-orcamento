import { Module } from '@nestjs/common';
import { CreateQuoteUseCase } from '../../application/quotes/create-quote.use-case';
import { QuotesController } from './quotes.controller';
import { AuthModule } from '../auth/auth.module';
@Module({ imports: [AuthModule], controllers: [QuotesController], providers: [CreateQuoteUseCase] })
export class QuotesModule {}
