import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import * as argon2 from 'argon2';
import { createHash } from 'node:crypto';
import { Request } from 'express';
import { Response } from 'express';
import { IsEmail, IsString, MinLength } from 'class-validator';
class LoginDto { @IsEmail() email!: string; @IsString() @MinLength(8) password!: string; }
@Controller('auth')
export class AuthController {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}
  @Post('login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) response: Response) { const user = await this.prisma.user.findUnique({ where: { email: body.email } }); if (!user || !(await argon2.verify(user.passwordHash, body.password))) throw new UnauthorizedException('Credenciais inválidas.'); return this.issueSession(user.id, response); }
  @Post('refresh')
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) { const token = request.cookies?.refresh_token; if (!token) throw new UnauthorizedException('Refresh token ausente.'); let payload: { sub: string; type: string }; try { payload = this.jwt.verify(token); } catch { throw new UnauthorizedException('Refresh token inválido.'); } const stored = await this.prisma.refreshToken.findFirst({ where: { tokenHash: createHash('sha256').update(token).digest('hex'), userId: payload.sub, revokedAt: null, expiresAt: { gt: new Date() } } }); if (!stored) throw new UnauthorizedException('Refresh token revogado ou expirado.'); await this.prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } }); return this.issueSession(payload.sub, response); }
  @Post('logout')
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) { const token = request.cookies?.refresh_token; if (token) await this.prisma.refreshToken.updateMany({ where: { tokenHash: createHash('sha256').update(token).digest('hex'), revokedAt: null }, data: { revokedAt: new Date() } }); response.clearCookie('refresh_token'); return { success: true }; }
  private async issueSession(userId: string, response: Response) { const accessToken = this.jwt.sign({ sub: userId }, { expiresIn: '15m' }); const refreshToken = this.jwt.sign({ sub: userId, type: 'refresh' }, { expiresIn: '30d' }); await this.prisma.refreshToken.create({ data: { userId, tokenHash: createHash('sha256').update(refreshToken).digest('hex'), expiresAt: new Date(Date.now() + 30 * 86400000) } }); response.cookie('refresh_token', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 30 * 86400000 }); return { accessToken }; }
}
