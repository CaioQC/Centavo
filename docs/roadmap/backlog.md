# Backlog

> **Em migração:** as tarefas passam a ser Issues do GitHub ([convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md)). Até os itens abaixo virarem Issues, esta lista segue valendo.

Lista única de tarefas soltas do projeto, fora das fases do [roadmap](roadmap.md). Marque com `[x]` ao concluir e, se a tarefa gerou uma decisão, registre no [registro de decisões](../decisoes/registro.md). Tarefas que dependem de dados reais da Pluggy ficam em [pendências](../pluggy/pendencias.md), não aqui.

## Antes da Fase 0
- [ ] Revisar a escolha do front (Vite + React + React Router + TanStack Query) com um dev front-end; se mudar algo, atualizar a [stack](../arquitetura/stack.md) e o [registro de decisões](../decisoes/registro.md).

## Antes da Fase 3
- [ ] Testar o Ollama no PC (Windows, RX 9060 XT 16 GB) com o backend Vulkan: confirmar em `ollama ps` que o modelo roda na GPU e anotar a velocidade com um Qwen de ~9B e um de ~27B. Registrar o resultado na nota [IA local](../arquitetura/ia-local.md).

## Documentação
- [ ] **Diagramas em Mermaid** (adiado por escolha; abordagem já decidida, ver registro em 2026-11-04):
  - [ ] Arquitetura de contêineres: PC, Docker (Postgres, Redis), API, worker, web, túnel, Pluggy, Meu Pluggy. Também vai para o README.
  - [ ] ER por domínio, a partir do [modelo de dados](../dominio/modelo-de-dados.md): conexões e contas; transações; orçamento e metas. A parte de transações e parcelas é rascunho até resolver as [pendências](../pluggy/pendencias.md).
  - [ ] Sequência dos fluxos difíceis: [reconciliação](../fluxos/reconciliacao.md) + webhook; transação recriada com troca de anotações ([ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md)); renovação/reconexão de item ([conexão de banco](../fluxos/conexao-meu-pluggy.md)).
- [ ] No início de cada fase, criar `roadmap/fase-N.md` com as histórias de usuário e os **critérios de aceite** daquela fase (os critérios viram testes).
