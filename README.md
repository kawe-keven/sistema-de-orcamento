# Freelancer Quotes Workspace

Monorepo para gestão de orçamentos com painel privado e portal público do cliente.

## Estrutura

- `apps/web`: Next.js App Router, painel e `/quote/[token]`.
- `apps/api`: Fastify modular, Prisma, JWT, links públicos e webhook de pagamento.
- `packages/contracts`: contratos compartilhados.
- `infra`: operação, backup e observabilidade.

## Desenvolvimento

Requisitos: Node.js 20+, npm 10+, Docker.

```bash
cp .env.example .env
docker compose up -d postgres
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

Painel: `http://localhost:3000`
API: `http://localhost:4000/api/health`

O endpoint público é `http://localhost:3000/quote/<token>`. Tokens são aleatórios, expirados e armazenados apenas como hash no banco.

O esqueleto do webhook Stripe está em `POST /webhooks/stripe`; antes de produção, conecte a verificação de assinatura, crie a sessão Checkout e implemente o envio SES/Resend do PDF. Essas integrações precisam de credenciais externas e não devem ser simuladas no ambiente local.

## Segurança e produção

Defina `JWT_SECRET`, chaves do provedor de pagamento, origem permitida e um domínio HTTPS real. O webhook deve ser validado pela assinatura do provedor. Configure backup diário do PostgreSQL com retenção de 30 dias, Sentry e métricas Prometheus antes do deploy.
