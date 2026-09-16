export class Money {
  private constructor(readonly cents: number) { if (!Number.isSafeInteger(cents) || cents < 0) throw new Error('Money must be a non-negative integer amount in cents.'); }
  static from(amount: number) { if (!Number.isFinite(amount) || amount < 0) throw new Error('Money must be a non-negative finite number.'); return new Money(Math.round(amount * 100)); }
  static fromCents(cents: number) { return new Money(cents); }
  get amount() { return this.cents / 100; }
  add(other: Money) { return Money.fromCents(this.cents + other.cents); }
  subtract(other: Money) { return Money.fromCents(Math.max(0, this.cents - other.cents)); }
}
