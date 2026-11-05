# Stack tecnológica

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Monorepo Manager** | Turborepo + `pnpm` Workspaces | Cache de compilação, execução paralela de scripts e vínculo nativo via `workspace:*`. |
| **Backend** | AdonisJS 7 (Node.js 24 & TypeScript) | Framework *batteries-included*, ORM Lucid, validação estrita (VineJS) e type-safety ponta a ponta. A v7 saiu em 25/02/2026 e exige Node.js 24. |
| **Web App** | Next.js / React (TypeScript) + Tuyau | Dashboard responsivo; cliente da API tipado a partir das rotas do AdonisJS. |
| **Mobile App** (pós-MVP) | React Native + Expo (TypeScript) | Multiplataforma. O MMKV exige *development build*, não roda no Expo Go ([ADR 05](../adr/adr-05-offline-first-mobile.md)). |
| **Banco de Dados** | PostgreSQL | Consistência ACID, `BIGINT`, tipos relacionais fortes. |
| **Processamento Assíncrono** | Redis + BullMQ (+ painel de filas, ex.: Bull Board) | Jobs agendados de reconciliação, processamento de webhooks, retries e visibilidade de falhas ([ADR 03](../adr/adr-03-reconciliacao-periodica.md)). |
| **Integração Bancária** | Pluggy API (`pluggy-sdk`) via **Meu Pluggy** | Agregador Open Finance no Brasil; o Meu Pluggy é gratuito para uso pessoal. |
| **2FA** | TOTP (RFC 6238) | Dados bancários reais justificam o segundo fator. |
| **Testes** | Japa (API), Vitest (`core` e `web`) | Japa é o runner oficial do AdonisJS. Ver [testes](testes.md). |
