import { Injectable } from '@nestjs/common';
import { createHmac, randomUUID } from 'node:crypto';
import { IssuedPublicToken, PublicTokenPort } from '../../domain/quotes/public-token.port';

@Injectable()
export class HmacPublicTokenService implements PublicTokenPort {
  private readonly secret = process.env.PORTAL_TOKEN_SECRET;
  constructor() { if (!this.secret) throw new Error('PORTAL_TOKEN_SECRET is required.'); }
  issue(): IssuedPublicToken { const raw = randomUUID(); return { raw, digest: this.digest(raw), expiresAt: new Date(Date.now() + 30 * 86400000) }; }
  digest(rawToken: string) { return createHmac('sha256', this.secret!).update(rawToken).digest('hex'); }
}
