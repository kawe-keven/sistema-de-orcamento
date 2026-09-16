import { Money } from './money.value-object';

describe('Money', () => {
  it('calculates currency using integer cents', () => {
    expect(Money.from(0.1).add(Money.from(0.2)).amount).toBe(0.3);
  });
  it('never produces a negative total after discount', () => {
    expect(Money.from(10).subtract(Money.from(20)).amount).toBe(0);
  });
});
