import { Controller, Headers, HttpCode, Post, Req, UnauthorizedException } from '@nestjs/common';
import Stripe from 'stripe';
import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Controller('webhooks')
export class StripeWebhookController {
  private readonly stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
  private readonly webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  constructor(private readonly prisma: PrismaService) {}
  @Post('stripe')
  @HttpCode(200)
  async handle(@Req() request: RawBodyRequest<Request>, @Headers('stripe-signature') signature: string) { if (!this.stripe || !this.webhookSecret) throw new UnauthorizedException('Stripe não configurado.'); if (!signature || !request.rawBody) throw new UnauthorizedException('Assinatura Stripe ausente.'); let event: Stripe.Event; try { event = this.stripe.webhooks.constructEvent(request.rawBody, signature, this.webhookSecret); } catch { throw new UnauthorizedException('Assinatura Stripe inválida.'); } if (event.type === 'checkout.session.completed') { const session = event.data.object as Stripe.Checkout.Session; const quoteId = session.metadata?.quoteId; if (quoteId) await this.prisma.$transaction([this.prisma.quote.update({ where: { id: quoteId }, data: { status: 'PAID' } }), this.prisma.payment.upsert({ where: { providerId: session.id }, update: { status: 'paid' }, create: { quoteId, provider: 'stripe', providerId: session.id, amount: (session.amount_total || 0) / 100, status: 'paid' } })]); } return { received: true }; }
}
