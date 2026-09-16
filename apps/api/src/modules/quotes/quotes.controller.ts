import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateQuoteUseCase } from '../../application/quotes/create-quote.use-case';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quotes')
@UseGuards(JwtAuthGuard)
export class QuotesController {
  constructor(private readonly createQuote: CreateQuoteUseCase, private readonly prisma: PrismaService) {}
  @Get()
  list(@Req() request: { user: { sub: string } }) { return this.prisma.quote.findMany({ where: { userId: request.user.sub }, include: { client: true }, orderBy: { createdAt: 'desc' } }); }
  @Post()
  create(@Req() request: { user: { sub: string } }, @Body() body: CreateQuoteDto) { return this.createQuote.execute({ ...body, userId: request.user.sub }); }
}
