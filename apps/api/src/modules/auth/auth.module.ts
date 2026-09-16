import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('JWT_SECRET is required.');
@Module({ imports: [JwtModule.register({ secret: jwtSecret })], controllers: [AuthController], providers: [JwtAuthGuard], exports: [JwtModule, JwtAuthGuard] })
export class AuthModule {}
