# Backlog

> **Em migração:** as tarefas passam a ser Issues do GitHub ([convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md)). Até os itens abaixo virarem Issues, esta lista segue valendo.

Lista única de tarefas soltas do projeto, fora das fases do [roadmap](roadmap.md). Marque com `[x]` ao concluir e, se a tarefa gerou uma decisão, registre no [registro de decisões](../decisoes/registro.md). Tarefas que dependem de dados reais da Pluggy ficam em [pendências](../pluggy/pendencias.md), não aqui.

## Antes da Fase 0
- [ ] Revisar a escolha do front (Vite + React + React Router + TanStack Query) com um dev front-end; se mudar algo, atualizar a [stack](../arquitetura/stack.md) e o [registro de decisões](../decisoes/registro.md).

## Na Fase 0
- [ ] **Checagens por máquina** (no lugar de agente; ver [uso de IA no desenvolvimento](../arquitetura/uso-de-ia-no-desenvolvimento.md)):
  - [ ] ESLint em `packages/core`: `no-restricted-imports` para `pluggy-sdk`, `@adonisjs/*`, `pg`, `ioredis`, `bullmq`, o cliente do Ollama, módulos do Node e `apps/*`; proibir `process.env`.
  - [ ] ESLint em `apps/web`: sem `pluggy-sdk`, `@adonisjs/*` nem `process.env`; da `api`, só `import type` dos tipos gerados pelo Tuyau.
  - [ ] ESLint em `apps/api`: `pluggy-sdk` só no adaptador da Pluggy (conversão só na borda) e o cliente do Ollama só nos jobs.
  - [ ] ESLint: `parseFloat` e `.toFixed(` só na formatação do `core` e no adaptador da Pluggy; `getMonth`, `getDate`, `getFullYear`, `getDay` e `toISOString().slice(...)` só no módulo de datas do `core`.
  - [ ] ESLint: `@typescript-eslint/no-explicit-any` e `@typescript-eslint/ban-ts-comment`.
  - [ ] No `core`, um tipo `Cents` com *brand*, para a mistura de centavos com número solto virar erro de tipo.
  - [ ] CI: falhar se o PR editar uma migration que já está na `develop`.
  - [ ] CI: falhar se um PR `fix/` ou `hotfix/` não alterar nenhum arquivo de teste, com a exceção da regra 6 de [testes](../arquitetura/testes.md) explicada no PR.
- [ ] **Permissões do Claude Code:** acrescentar ao `deny` do `.claude/settings.json` a pasta dos backups, quando ela for definida. O padrão `.env.*` também bloqueia a leitura do `.env.example`; se o Claude precisar editá-lo, trocar por padrões mais específicos (ex.: `.env.production`).
- [ ] **Testar os agentes e medir o custo** nos dois ou três primeiros PRs com código, e depois parar de medir:
  - [ ] Rodar o `revisor-de-regras` e o `testador-do-core` de verdade e ajustar os prompts.
  - [ ] Ao fim de cada uma dessas sessões, pedir ao Claude "explique meu uso" e comparar com uma sessão parecida sem agentes; acompanhar também a página de uso do plano no claude.ai.
  - [ ] Decidir com os números: manter como está, rodar o revisor só em PRs que mexem em `apps/api` ou `packages/core`, ou rever a regra de uma sessão por tarefa. Registrar a decisão no [registro de decisões](../decisoes/registro.md).

- [ ] Ao escrever o primeiro `roadmap/fase-N.md`, criar a skill `planejar-historia`: história, critérios Dado / Quando / Então e um desenho curto (tabelas, rotas e fluxos que ela toca), no formato padrão ([uso de IA no desenvolvimento](../arquitetura/uso-de-ia-no-desenvolvimento.md)).

## Na Fase 2
- [ ] Criar o `testador-da-api` (Japa, Sonnet), quando existirem o *fake* da Pluggy, as fixtures anonimizadas e o teste golden da [reconciliação](../fluxos/reconciliacao.md). Mesma regra de autoria do `testador-do-core` (modo casos no código do Caio); roda só no PC, porque precisa de Docker.

## Antes da Fase 3
- [ ] Testar o Ollama no PC (Windows, RX 9060 XT 16 GB) com o backend Vulkan: confirmar em `ollama ps` que o modelo roda na GPU e anotar a velocidade com um Qwen de ~9B e um de ~27B. Registrar o resultado na nota [IA local](../arquitetura/ia-local.md).

## Quando acontecer
Tarefas sem fase, presas a um gatilho.
- [ ] **Gatilho: um procedimento se repete pela terceira vez.** Avaliar uma skill para ele. Candidatas: `nova-migration`, `teste-de-regressao` (passo a passo do teste que falha antes da correção, também útil ao `testador-do-core`) e `promover-release`.
- [ ] **Gatilho: uma pasta (`apps/api`, `apps/web` ou `packages/core`) passa a ter regras só dela.** Criar o `CLAUDE.md` da pasta e mover para lá essas regras, deixando no da raiz só o que vale para tudo. O Claude Code só carrega o `CLAUDE.md` de uma pasta quando trabalha nela ([uso de IA no desenvolvimento](../arquitetura/uso-de-ia-no-desenvolvimento.md)).
- [ ] **Gatilho: uma tarefa na nuvem não coube numa sessão.** Testar se uma sessão nova na nuvem consegue continuar e dar push numa branch `claude/...` já existente. Se der, registrar a continuação na mesma branch e no mesmo PR rascunho; se não, a regra "cabe numa sessão" continua.
- [ ] **Gatilho: o web ganha uma nota de design com tokens.** Criar o `auditor-de-design` (Haiku, só leitura), adaptado do centavo-mobile.
- [ ] **Gatilho: terminou o experimento de medição de custo da Fase 0.** Testar uma rotina de fim de sessão em que o Claude sugere como melhorar a sessão que acabou (regra, agente, habilidade ou forma de pedir). Medir o custo dela e o que ela traz além da economia de tokens; manter só se compensar ([uso de IA no desenvolvimento](../arquitetura/uso-de-ia-no-desenvolvimento.md)).

## Documentação
- [ ] **Diagramas em Mermaid** (adiado por escolha; abordagem já decidida, ver registro em 2026-11-04):
  - [ ] Arquitetura de contêineres: PC, Docker (Postgres, Redis), API, worker, web, túnel, Pluggy, Meu Pluggy. Também vai para o README.
  - [ ] ER por domínio, a partir do [modelo de dados](../dominio/modelo-de-dados.md): conexões e contas; transações; orçamento e metas. A parte de transações e parcelas é rascunho até resolver as [pendências](../pluggy/pendencias.md).
  - [ ] Sequência dos fluxos difíceis: [reconciliação](../fluxos/reconciliacao.md) + webhook; transação recriada com troca de anotações ([ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md)); renovação/reconexão de item ([conexão de banco](../fluxos/conexao-meu-pluggy.md)).
- [ ] No início de cada fase, criar `roadmap/fase-N.md` com as histórias de usuário e os **critérios de aceite** daquela fase (os critérios viram testes).
