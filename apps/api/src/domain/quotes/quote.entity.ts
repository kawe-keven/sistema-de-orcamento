import { Money } from './money.value-object';

export type QuoteLine = { description: string; quantity: number; unitPrice: number };
export class QuoteEntity {
  constructor(readonly items: QuoteLine[], readonly discount: Money, readonly tax: Money) {}
  subtotal() { return this.items.reduce((total, item) => total.add(Money.from(item.quantity * item.unitPrice)), Money.from(0)); }
  total() { return this.subtotal().subtract(this.discount).add(this.tax); }
}
