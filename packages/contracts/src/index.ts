export type QuoteStatus = 'DRAFT' | 'SENT' | 'VIEWED' | 'APPROVED' | 'DECLINED' | 'PAID';
export type QuoteItem = { description: string; quantity: number; unitPrice: number };
export type QuoteSummary = { id: string; clientName: string; project: string; status: QuoteStatus; total: number; createdAt: string };
export type PublicQuote = { id: string; token: string; clientName: string; project: string; description: string; items: QuoteItem[]; subtotal: number; discount: number; tax: number; total: number; expiresAt: string; status: QuoteStatus };
