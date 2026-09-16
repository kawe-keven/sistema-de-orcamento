import { Test } from '@nestjs/testing';
import { HealthController } from './interfaces/http/health.controller';

describe('health', () => {
  it('returns service status', async () => {
    const module = await Test.createTestingModule({ controllers: [HealthController] }).compile();
    const controller = module.get(HealthController);
    expect(controller.getStatus()).toEqual({ status: 'ok', service: 'quotes-api', framework: 'nestjs' });
  });
});
