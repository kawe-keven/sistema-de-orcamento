import { Module } from '@nestjs/common';
import { CreateQuoteUseCase } from '../../application/quotes/create-quote.use-case';
import { QuotesController } from './quotes.controller';
import { AuthModule } from '../auth/auth.module';
import { HmacPublicTokenService } from '../../infrastructure/security/hmac-public-token.service';
import { PUBLIC_TOKEN_PORT } from '../../domain/quotes/public-token.port';
import { ListQuotesUseCase } from '../../application/quotes/list-quotes.use-case';
import { PrismaQuoteRepository } from '../../infrastructure/prisma/prisma-quote.repository';
import { QUOTE_REPOSITORY } from '../../domain/quotes/quote-repository.port';
import { PrismaAuditAdapter } from '../../infrastructure/prisma/prisma-audit.adapter';
import { AUDIT_PORT } from '../../domain/audit/audit.port';
@Module({ imports: [AuthModule], controllers: [QuotesController], providers: [CreateQuoteUseCase, ListQuotesUseCase, HmacPublicTokenService, PrismaQuoteRepository, PrismaAuditAdapter, { provide: PUBLIC_TOKEN_PORT, useExisting: HmacPublicTokenService }, { provide: QUOTE_REPOSITORY, useExisting: PrismaQuoteRepository }, { provide: AUDIT_PORT, useExisting: PrismaAuditAdapter }] })
export class QuotesModule {}
