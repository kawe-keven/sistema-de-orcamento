import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { HealthController } from './interfaces/http/health.controller';
import { QuotesModule } from './modules/quotes/quotes.module';
import { PublicQuotesModule } from './modules/public-quotes/public-quotes.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({ imports: [ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]), PrismaModule, AuthModule, QuotesModule, PublicQuotesModule], controllers: [HealthController], providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }] })
export class AppModule {}
