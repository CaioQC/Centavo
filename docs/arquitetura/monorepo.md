# Monorepo e papel de cada parte

O projeto adota um **monorepo único** (sem Git Submodules) com **pnpm workspaces** e **Turborepo** para orquestração de compilação, cache e scripts.

```text
centavo/
├── apps/
│   ├── api/                   # Backend REST API (AdonisJS 7): models e migrations Lucid,
│   │                          # cliente Pluggy, webhooks, jobs BullMQ
│   └── web/                   # Dashboard Web (Vite + React, SPA)
├── packages/
│   ├── core/                  # @centavo/core: domínio puro e isomórfico (sem I/O, sem segredos)
│   ├── tsconfig/              # @centavo/tsconfig: configurações TypeScript base
│   └── eslint-config/         # @centavo/eslint-config: padronização de código
├── docs/                      # Este vault do Obsidian
├── docker-compose.yml         # PostgreSQL + Redis para desenvolvimento
├── pnpm-workspace.yaml        # Mapeamento dos pacotes do monorepo
├── turbo.json                 # Pipelines de build, dev, lint e test do Turborepo
└── package.json               # Dependências de raiz e scripts globais
```

## Papel de cada parte
- **`@centavo/core`**: TypeScript puro, roda igual no Node e no navegador. Contém conversão e formatação de centavos, datas no fuso `America/Sao_Paulo`, cálculo do mês de orçamento de uma parcela, impressão digital de transação, agrupamento por categoria, detecção de transferências internas e de assinaturas, projeção de faturas, e os tipos de domínio e DTOs da API.
  **Proibido** neste pacote: `pluggy-sdk`, acesso a banco, variáveis de ambiente, qualquer segredo. Ele é importado pelo front, então tudo o que estiver nele vai para o bundle do navegador.
- **`apps/api`**: único lugar que fala com a Pluggy (`pluggy-sdk`, `CLIENT_ID`, `CLIENT_SECRET`) e com o banco (models e migrations do Lucid). Expõe as rotas HTTP, autenticação com 2FA, webhook e jobs.
- **`apps/web`**: dashboard SPA (Vite + React + React Router + TanStack Query); consome `@centavo/core` para tipos, DTOs e regras de exibição. Fala com a API por HTTP. O build gera arquivos estáticos, servidos pelo próprio AdonisJS na mesma origem ([segurança e operação](seguranca-e-operacao.md)).

> Um app mobile ficou como ideia futura, fora do roadmap. Se voltar, entra como `apps/mobile` consumindo o `@centavo/core` da mesma forma ([ADR 05](../adr/adr-05-offline-first-mobile.md)).

> Os tipos do banco **não** são compartilhados com o front: o contrato é o DTO da API. O `web` fala com a API pelo **Tuyau**, o cliente HTTP tipado oficial do AdonisJS 7, gerado a partir das rotas, controllers e validators (`node ace tuyau:generate`, a rodar sempre que uma rota mudar). Ele exige monorepo, o que já é o caso, e tem integração com TanStack Query (`@tuyau/react-query`).

Veja também: [Stack](stack.md).
