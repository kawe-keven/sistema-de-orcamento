import { ConflictException } from '@nestjs/common';
export type PublicResponseStatus = 'DRAFT' | 'SENT' | 'VIEWED' | 'APPROVED' | 'DECLINED' | 'PAID';
export function assertPublicResponseAllowed(status: PublicResponseStatus) { if (status !== 'SENT' && status !== 'VIEWED') throw new ConflictException('Esta proposta não pode mais receber resposta.'); }
