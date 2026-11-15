# Uso de IA no desenvolvimento

Regras para o uso do Claude Code no desenvolvimento do Centavo. A IA **dentro do produto** é outro assunto ([IA local](ia-local.md)). O porquê está no [registro de decisões](../decisoes/registro.md).

## Onde o Claude age
- **No PC:** o Caio acompanha a sessão. O Claude nunca faz commit, push nem PR sem perguntar; o padrão é entregar o texto da mensagem de commit.
- **Na nuvem (celular):** o Claude trabalha numa branch `claude/...`, de nome fixo, e pode commitar e dar push nela, com a autoria do Caio. PR só com pedido explícito, aberto como **rascunho**, com o **Caio como assignee** e a label **`claude`**. Só o Caio tira de rascunho, depois de revisar, e faz o merge. Não se pede revisão porque o GitHub não deixa pedir ao autor do PR, que é o usuário do Caio.
- **Escolha de produto é do Caio:** o Claude propõe e pergunta, não decide.
- **PRs pequenos quando o Claude é o agente,** com as mesmas exigências de teste do código do Caio ([testes](testes.md)).

## Co-autoria
- **Com a linha** `Co-Authored-By: Claude <noreply@anthropic.com>` (última linha da mensagem, sem nome de modelo): o Claude escreveu uma parte relevante do diff. **Sem a linha:** o Caio escreveu, e o Claude só revisou, explicou ou redigiu a mensagem. O Caio é sempre o autor.
- **PRs separados:** trabalho relevante do Caio e do Claude vai em PRs diferentes, mesmo na mesma Issue, porque com squash a linha de co-autoria marca o PR inteiro.
- **Squash:** quando o PR tem commits com co-autoria, a última linha da descrição do PR é a linha de co-autoria.
- **Sem rodapé "Generated with Claude Code"** nem outra atribuição: a label `claude` e a co-autoria já cumprem esse papel.
- O passo a passo está na skill `preparar-commit-e-pr`.

## Dados bancários reais nunca vão para o Claude
O Claude Code é IA na nuvem. Nada de colar numa conversa, nem no PC: JSON bruto da Pluggy, extratos, saldos reais, o `.env` ou backups. Para depurar, usar as fixtures anonimizadas ([testes](testes.md)). É a mesma regra da IA do produto ([IA local](ia-local.md)).

## Sessões
- **Uma sessão por tarefa** (o tamanho de um PR). Tudo o que importa fica no repositório, e a sessão nova recomeça pelo `CLAUDE.md`, pelas notas e pela Issue.
- **Ao parar no meio,** o estado (feito, falta, onde parou, branch) vai num comentário da Issue; no PC, publicado com o OK do Caio.

## Agentes
Subagentes do Claude Code em `.claude/agents/`, versionados como código. O prompt de cada um **aponta** para o `CLAUDE.md`, as ADRs e os fluxos, sem copiar as regras.

| Agente | Tarefa | Pode editar? | Modelo | Quando usar |
|---|---|---|---|---|
| `revisor-de-regras` | Aponta no diff violações das regras que pedem julgamento (idempotência, soft delete, item sem sucesso, anotações, identidade da operação, valores, datas, transferências, segurança) | Não | Sonnet | Uma vez por PR com código, antes de propor o commit |
| `testador-do-core` | Testes Vitest do `@centavo/core`. **Modo casos** (padrão): lista os casos que faltam e roda a suíte. **Modo escrita**: escreve testes | Só no modo escrita, e só `packages/core/**/*.test.ts` | Sonnet | **Em avaliação:** depois dos primeiros PRs com código no `core`, decidir se fica ou se o revisor basta ([backlog](../roadmap/backlog.md)) |

- **Testes do código do Caio são escritos pelo Caio:** no código dele, o testador fica no modo casos. O modo escrita é só para código escrito pelo Claude ou para um PR próprio de cobertura (`test(core): ...`).
- **Complementam o lint:** o que dá para checar por máquina vai para ESLint e CI ([backlog](../roadmap/backlog.md)); o agente é para o que pede julgamento.
- **Rede por baixo:** o `.claude/settings.json` versionado nega a leitura de `.env*` e de `**/fixtures/pluggy-raw/**` e os comandos `psql`, `pg_dump`, `pg_restore` e `docker exec`. É uma rede, não um muro: vale a regra de dados reais acima.
- **Custo:** cada agente começa do zero e consome o limite do plano; por isso, uma vez por PR.

## Skills
Procedimentos que se repetem, em `.claude/skills/`. Só o nome e a descrição ficam no contexto; o conteúdo é carregado quando a skill é usada.

| Skill | O que faz | Quando |
|---|---|---|
| `checar-links` | Script Node que confere links quebrados, wikilinks, links para seção e caminhos entre crases | Depois de mexer em notas; antes de commitar `.md` |
| `preparar-commit-e-pr` | Roteiro de branch, arquivos do commit, mensagem, co-autoria e descrição do PR, no PC e na nuvem | Ao commitar, propor mensagem, dar push ou abrir PR |

Skill nova só quando um procedimento se repetir pela terceira vez ([backlog](../roadmap/backlog.md)).
