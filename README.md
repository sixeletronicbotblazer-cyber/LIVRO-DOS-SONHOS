# Livro dos Sonhos — Página de Vendas

Landing page de vendas do **Livro dos Sonhos — Significados e Números Associados**: significados de sonhos, os 25 bichos e os números para consultar antes de jogar.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS 4 + shadcn/ui
- Prisma ORM (SQLite) — captura de leads via `/api/leads`
- Framer Motion + Sonner

## Como rodar

```bash
bun install          # ou npm install
cp .env.example .env
bun run db:push      # cria o banco SQLite (db/custom.db)
bun run dev          # http://localhost:3000
```

## Ofertas e links de checkout (Cakto)

Todos os preços e links ficam centralizados em **`src/lib/comercial.ts`**:

| Oferta | Preço | Onde aparece | Link |
|---|---|---|---|
| Livro dos Sonhos (livro digital) | R$ 12,90 | Card 1 da oferta | https://pay.cakto.com.br/s859tjs_1137379 |
| Oferta Bônus (livro + aplicativo) | R$ 19,90 | Pop-up de downsell ao clicar no card 1 | https://pay.cakto.com.br/h5rkmfh |
| Plano Completo (livro + aplicativo) | R$ 24,90 | Card 2 da oferta (MAIS ESCOLHIDO) | https://pay.cakto.com.br/abm46ub |

## Configurações rápidas

- **WhatsApp de suporte**: campo `whatsappNumber` em `src/lib/comercial.ts` (só dígitos, com DDI; vazio = botão oculto).
- **Textos da página**: `src/lib/content.ts`.
- **Cores/estilos**: `src/app/globals.css` + `src/styles.css`.

## Observação sobre produção

A captura de leads usa SQLite (arquivo local). Em hospedagens sem disco persistente (ex.: Vercel), troque o `provider` do Prisma por um banco externo se quiser guardar os leads.
