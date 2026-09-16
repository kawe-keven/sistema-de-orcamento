import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { QuoteRepository, QuoteRecord } from '../../domain/quotes/quote-repository.port';

@Injectable()
export class PrismaQuoteRepository implements QuoteRepository {
  constructor(private readonly prisma: PrismaService) {}
  upsertClient(name: string, email: string) { return this.prisma.client.upsert({ where: { email }, update: { name }, create: { name, email } }); }
  create(input: Parameters<QuoteRepository['create']>[0]) { return this.prisma.quote.create({ data: input, include: { client: true } }) as Promise<QuoteRecord>; }
  listByUser(userId: string) { return this.prisma.quote.findMany({ where: { userId }, include: { client: true }, orderBy: { createdAt: 'desc' } }) as Promise<QuoteRecord[]>; }
  findPublic(tokenHash: string, now: Date, consumed = false) { return this.prisma.quote.findFirst({ where: { publicTokenHash: tokenHash, publicTokenExpiresAt: { gt: now }, ...(consumed ? {} : { publicTokenConsumedAt: null }) }, include: { client: true } }) as Promise<QuoteRecord | null>; }
  updateResponse(id: string, status: 'APPROVED' | 'DECLINED', consumedAt: Date) { return this.prisma.quote.update({ where: { id }, data: { status, publicTokenConsumedAt: consumedAt }, include: { client: true } }) as Promise<QuoteRecord>; }
}
