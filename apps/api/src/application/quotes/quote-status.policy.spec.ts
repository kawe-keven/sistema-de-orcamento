import { ConflictException } from '@nestjs/common';
import { assertPublicResponseAllowed } from './quote-status.policy';

describe('public quote status policy', () => {
  it('allows responses only for sent or viewed quotes', () => { expect(() => assertPublicResponseAllowed('SENT')).not.toThrow(); expect(() => assertPublicResponseAllowed('VIEWED')).not.toThrow(); });
  it('rejects responses for terminal or draft quotes', () => { expect(() => assertPublicResponseAllowed('DRAFT')).toThrow(ConflictException); expect(() => assertPublicResponseAllowed('PAID')).toThrow(ConflictException); });
});
