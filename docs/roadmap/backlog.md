# Backlog

> **Em migração:** as tarefas passam a ser Issues do GitHub ([convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md)), a começar pelas histórias do `fase-0.md`. Até lá, esta lista segue valendo.

Lista única de tarefas soltas do projeto, fora das fases do [roadmap](roadmap.md). Marque com `[x]` ao concluir. Tarefas que dependem de dados reais da Pluggy ficam em [pendências](../pluggy/pendencias.md), não aqui.

## Na Fase 0
- [ ] **Checagens por máquina** (no lugar de agente; ver [uso de IA no desenvolvimento](../arquitetura/uso-de-ia-no-desenvolvimento.md)):
  - [ ] ESLint em `packages/core`: `no-restricted-imports` para `pluggy-sdk`, `@adonisjs/*`, `pg`, `ioredis`, `bullmq`, o cliente do Ollama, módulos do Node e `apps/*`; proibir `process.env`.
  - [ ] ESLint em `apps/web`: sem `pluggy-sdk`, `@adonisjs/*` nem `process.env`; da `api`, só `import type` dos tipos gerados pelo Tuyau.
  - [ ] ESLint em `apps/api`: `pluggy-sdk` só no adaptador da Pluggy (conversão só na borda) e o cliente do Ollama só nos jobs.
  - [ ] ESLint: `parseFloat` e `.toFixed(` só na formatação do `core` e no adaptador da Pluggy; `getMonth`, `getDate`, `getFullYear`, `getDay` e `toISOString().slice(...)` só no módulo de datas do `core`.
  - [ ] ESLint: `@typescript-eslint/no-explicit-any` e `@typescript-eslint/ban-ts-comment`.
  - [ ] No `core`, um tipo `Cents` com *brand*, para a mistura de centavos com número solto virar erro de tipo.
- [ ] **Permissões do Claude Code:** acrescentar ao `deny` do `.claude/settings.json` a pasta dos backups, quando ela for definida. O padrão `.env.*` também bloqueia a leitura do `.env.example`; se o Claude precisar editá-lo, trocar por padrões mais específicos (ex.: `.env.production`).
- [ ] **Agentes:** ajustar o prompt do `revisor-de-regras` nos primeiros PRs com código. Depois dos primeiros PRs com código no `core`, decidir se o `testador-do-core` fica ou se o revisor basta; se sair, a lista de casos de borda dele vai para a nota de [testes](../arquitetura/testes.md).

## Na Fase 2
- [ ] Criar o `testador-da-api` (Japa, Sonnet), quando existirem o *fake* da Pluggy, as fixtures anonimizadas e o teste golden da [reconciliação](../fluxos/reconciliacao.md), se o `testador-do-core` tiver se pagado. Roda só no PC, porque precisa de Docker.
- [ ] Quando as migrations existirem, o [modelo de dados](../dominio/modelo-de-dados.md) passa a guardar só o porquê e as invariantes de cada tabela, sem a lista de colunas.

## No fim da Fase 2 (antes da primeira release)
- [ ] CI: falhar se o PR editar uma migration que já está numa release.
- [ ] CI: barrar título de PR fora do padrão ([convenções](../arquitetura/convencoes-de-git.md)).

## Quando acontecer
Tarefas sem fase, presas a um gatilho.
- [ ] **Gatilho: um procedimento se repete pela terceira vez.** Avaliar uma skill para ele. Candidatas: `nova-migration` e `teste-de-regressao`.
- [ ] **Gatilho: uma pasta (`apps/api`, `apps/web` ou `packages/core`) passa a ter regras só dela.** Criar o `CLAUDE.md` da pasta e mover para lá essas regras, deixando no da raiz só o que vale para tudo.

## Documentação
- [ ] **Diagramas em Mermaid**, feitos uma vez, quando o que descrevem existir:
  - [ ] **Na Fase 2, junto com o código:** sequência da [reconciliação](../fluxos/reconciliacao.md) + webhook, no lugar dos desenhos em texto da nota.
  - [ ] **No fim da Fase 2:** arquitetura de contêineres (PC, Docker, API, worker, web, túnel, Pluggy, Meu Pluggy), também no README; e um único `erDiagram` a partir das migrations, no lugar do desenho em texto do [modelo de dados](../dominio/modelo-de-dados.md).
  - [ ] **Na primeira renovação real do Meu Pluggy:** sequência da renovação/reconexão de item ([conexão de banco](../fluxos/conexao-meu-pluggy.md)), se o comportamento confirmado justificar.
- [ ] No início de cada fase, criar `roadmap/fase-N.md` com as histórias de usuário e os **critérios de aceite** daquela fase (os critérios viram testes).
