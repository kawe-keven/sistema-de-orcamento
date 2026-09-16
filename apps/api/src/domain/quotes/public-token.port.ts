export const PUBLIC_TOKEN_PORT = Symbol('PUBLIC_TOKEN_PORT');
export type IssuedPublicToken = { raw: string; digest: string; expiresAt: Date };
export interface PublicTokenPort { issue(): IssuedPublicToken; digest(rawToken: string): string; }
