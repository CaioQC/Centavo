# Stack tecnológica

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Monorepo Manager** | Turborepo + `pnpm` Workspaces | Cache de compilação, execução paralela de scripts e vínculo nativo via `workspace:*`. |
| **Backend** | AdonisJS 7 (Node.js 24 & TypeScript) | Framework *batteries-included*, ORM Lucid, validação estrita (VineJS) e type-safety ponta a ponta. A v7 saiu em 25/02/2026 e exige Node.js 24. |
| **Web App** | Vite + React (TypeScript), React Router (modo SPA, sem o modo framework), TanStack Query, Tuyau | Painel atrás de login, para um usuário, na rede local: não precisa de renderização no servidor nem SEO. SPA estático dispensa um segundo servidor Node e simplifica a sessão (mesma origem que a API). Vite compartilha o ecossistema do Vitest. React Router por ser o roteador mais comum no mercado. Escolha a revisar com um dev front-end ([backlog](../roadmap/backlog.md)). |
| **Banco de Dados** | PostgreSQL | Consistência ACID, `BIGINT`, tipos relacionais fortes. |
| **Processamento Assíncrono** | Redis + BullMQ (+ painel de filas, ex.: Bull Board) | Jobs agendados de reconciliação, processamento de webhooks, retries e visibilidade de falhas ([ADR 03](../adr/adr-03-reconciliacao-periodica.md)). |
| **Integração Bancária** | Pluggy API (`pluggy-sdk`) via **Meu Pluggy** | Agregador Open Finance no Brasil; o Meu Pluggy é gratuito para uso pessoal. |
| **IA local** | Ollama + modelo Qwen, rodando na GPU do PC | Sugestões de categoria e regra, perguntas e resumo do mês sem tirar dado bancário do PC. Ver [IA local](ia-local.md). |
| **2FA** | TOTP (RFC 6238) | Dados bancários reais justificam o segundo fator. |
| **Testes** | Japa (API), Vitest (`core`), Docker Compose (Postgres e Redis de teste) | Japa é o runner oficial do AdonisJS. Stack enxuta; ver [testes](testes.md). |
