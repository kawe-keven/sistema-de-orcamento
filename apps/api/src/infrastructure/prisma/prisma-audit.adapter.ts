import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuditPort } from '../../domain/audit/audit.port';
@Injectable()
export class PrismaAuditAdapter implements AuditPort {
  constructor(private readonly prisma: PrismaService) {}
  async record(input: { userId?: string; quoteId?: string; action: string; metadata?: Record<string, unknown> }) { await this.prisma.auditLog.create({ data: { userId: input.userId, quoteId: input.quoteId, action: input.action, metadata: input.metadata || {} } }); }
}
