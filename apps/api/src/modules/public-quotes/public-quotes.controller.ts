import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { RespondToQuoteUseCase } from '../../application/quotes/respond-to-quote.use-case';
import { RespondQuoteDto } from './dto/respond-quote.dto';

@Controller('public/quotes')
export class PublicQuotesController {
  constructor(private readonly prisma: PrismaService, private readonly respond: RespondToQuoteUseCase) {}
  @Get(':token')
  async get(@Param('token') token: string) { const quote = await this.prisma.quote.findFirst({ where: { publicTokenHash: createHash('sha256').update(token).digest('hex'), publicTokenExpiresAt: { gt: new Date() } }, include: { client: true } }); if (!quote) throw new NotFoundException('Proposta não encontrada ou expirada.'); return quote; }
  @Post(':token/respond') respondToQuote(@Param('token') token: string, @Body() body: RespondQuoteDto) { return this.respond.execute(token, body.status, body.signerName, body.document); }
}
