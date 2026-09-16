export const AUDIT_PORT = Symbol('AUDIT_PORT');
export interface AuditPort { record(input: { userId?: string; quoteId?: string; action: string; metadata?: Record<string, unknown> }): Promise<void>; }
