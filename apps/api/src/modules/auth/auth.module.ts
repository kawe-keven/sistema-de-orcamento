import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
@Module({ imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'development-only-change-me' })], controllers: [AuthController], providers: [JwtAuthGuard], exports: [JwtModule, JwtAuthGuard] })
export class AuthModule {}
