import { Money } from './money.value-object';

export type QuoteLine = { description: string; quantity: number; unitPrice: number };
export class QuoteEntity {
  constructor(readonly items: QuoteLine[], readonly discount: Money, readonly tax: Money) {}
  subtotal() { return Money.from(this.items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)); }
  total() { return this.subtotal().subtract(this.discount).add(this.tax); }
}
