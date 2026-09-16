export class Money {
  private constructor(readonly amount: number) { if (!Number.isFinite(amount) || amount < 0) throw new Error('Money must be a non-negative finite number.'); }
  static from(amount: number) { return new Money(Math.round(amount * 100) / 100); }
  add(other: Money) { return Money.from(this.amount + other.amount); }
  subtract(other: Money) { return Money.from(Math.max(0, this.amount - other.amount)); }
}
