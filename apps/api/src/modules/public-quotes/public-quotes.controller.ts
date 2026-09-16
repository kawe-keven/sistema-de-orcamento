import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RespondToQuoteUseCase } from '../../application/quotes/respond-to-quote.use-case';
import { RespondQuoteDto } from './dto/respond-quote.dto';
import { GetPublicQuoteUseCase } from '../../application/quotes/get-public-quote.use-case';

@Controller('public/quotes')
export class PublicQuotesController {
  constructor(private readonly getPublicQuote: GetPublicQuoteUseCase, private readonly respond: RespondToQuoteUseCase) {}
  @Get(':token')
  get(@Param('token') token: string) { return this.getPublicQuote.execute(token); }
  @Post(':token/respond') respondToQuote(@Param('token') token: string, @Body() body: RespondQuoteDto) { return this.respond.execute(token, body.status, body.signerName, body.document); }
}
