import { Module } from '@nestjs/common';
import { RespondToQuoteUseCase } from '../../application/quotes/respond-to-quote.use-case';
import { PublicQuotesController } from './public-quotes.controller';
import { GetPublicQuoteUseCase } from '../../application/quotes/get-public-quote.use-case';
import { HmacPublicTokenService } from '../../infrastructure/security/hmac-public-token.service';
import { PUBLIC_TOKEN_PORT } from '../../domain/quotes/public-token.port';
import { PrismaQuoteRepository } from '../../infrastructure/prisma/prisma-quote.repository';
import { QUOTE_REPOSITORY } from '../../domain/quotes/quote-repository.port';
import { PrismaAuditAdapter } from '../../infrastructure/prisma/prisma-audit.adapter';
import { AUDIT_PORT } from '../../domain/audit/audit.port';
@Module({ controllers: [PublicQuotesController], providers: [RespondToQuoteUseCase, GetPublicQuoteUseCase, HmacPublicTokenService, PrismaQuoteRepository, PrismaAuditAdapter, { provide: PUBLIC_TOKEN_PORT, useExisting: HmacPublicTokenService }, { provide: QUOTE_REPOSITORY, useExisting: PrismaQuoteRepository }, { provide: AUDIT_PORT, useExisting: PrismaAuditAdapter }] })
export class PublicQuotesModule {}
