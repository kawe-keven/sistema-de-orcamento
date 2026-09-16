'use client';
import { useState } from 'react';

export function PublicQuoteActions({ token }: { token: string }) {
  const [signerName, setSignerName] = useState('');
  const [document, setDocument] = useState('');
  const [message, setMessage] = useState('');
  const respond = async (status: 'APPROVED' | 'DECLINED') => { setMessage('Enviando...'); const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/public/quotes/${token}/respond`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, signerName, document }) }); setMessage(response.ok ? status === 'APPROVED' ? 'Proposta aceita.' : 'Proposta recusada.' : 'Não foi possível registrar sua resposta.'); };
  return <div className="mt-8"><div className="grid gap-3 sm:grid-cols-2"><input required value={signerName} onChange={event => setSignerName(event.target.value)} className="rounded-md border border-[#e5eae3] p-3" placeholder="Nome completo" aria-label="Nome completo"/><input required value={document} onChange={event => setDocument(event.target.value)} className="rounded-md border border-[#e5eae3] p-3" placeholder="CPF ou CNPJ" aria-label="CPF ou CNPJ"/></div><div className="mt-4 flex flex-wrap gap-3"><button disabled={!signerName || !document} onClick={() => respond('APPROVED')} className="rounded-md bg-[#17221d] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Aceitar proposta</button><button disabled={!signerName || !document} onClick={() => respond('DECLINED')} className="rounded-md border border-[#e5eae3] bg-white px-5 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-50">Recusar</button></div>{message && <p className="mt-4 text-sm text-[#2f8d61]" role="status">{message}</p>}</div>;
}
