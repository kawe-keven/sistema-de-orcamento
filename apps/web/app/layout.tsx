import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Workspace de orçamentos', description: 'Crie e envie propostas para seus clientes.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
