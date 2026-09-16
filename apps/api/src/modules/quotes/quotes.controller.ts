import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateQuoteUseCase } from '../../application/quotes/create-quote.use-case';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ListQuotesUseCase } from '../../application/quotes/list-quotes.use-case';

@Controller('quotes')
@UseGuards(JwtAuthGuard)
export class QuotesController {
  constructor(private readonly createQuote: CreateQuoteUseCase, private readonly listQuotes: ListQuotesUseCase) {}
  @Get()
  list(@Req() request: { user: { sub: string } }) { return this.listQuotes.execute(request.user.sub); }
  @Post()
  create(@Req() request: { user: { sub: string } }, @Body() body: CreateQuoteDto) { return this.createQuote.execute({ ...body, userId: request.user.sub }); }
}
