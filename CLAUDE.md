# Centavo

Sistema de gerenciamento financeiro pessoal integrado à Pluggy (Open Finance Brasil). Uso pessoal (um único usuário) e projeto de portfólio. **Estado atual: só documentação; nenhum código ainda.**

Toda a especificação está no vault do Obsidian em `docs/`. Comece por [docs/inicio.md](docs/inicio.md), que é o índice.

## Sobre o dono do projeto
- Caio, dev **back-end** (Java/Spring no trabalho). Neste projeto aprende AdonisJS/TypeScript.
- Conversa em **português**. Código (classes, campos, rotas) em inglês; textos para o usuário e documentação em português.
- Trabalha no projeto pelo PC e, no celular, por sessões do Claude Code na nuvem (planejamento).

## Onde está cada assunto
| Para… | Leia |
|---|---|
| Entender o produto e o que foi decidido | `docs/produto/decisoes-de-produto.md` |
| Saber **por que** algo foi decidido | `docs/decisoes/registro.md`: não leia o arquivo inteiro; busque o assunto e leia só a entrada (`### data: título`) que aparecer |
| Regras de arquitetura | `docs/adr/` (uma ADR por arquivo; índice em `docs/inicio.md`) |
| Padrões de arquitetura e de projeto (quais usar e quais não) | `docs/arquitetura/padroes-de-arquitetura-e-projeto.md` |
| Tabelas e campos | `docs/dominio/modelo-de-dados.md` |
| Fluxos (conexão, reconciliação, pipeline, fatura, orçamento) | `docs/fluxos/` |
| O que a Pluggy faz de verdade | `docs/pluggy/fatos-verificados.md` |
| O que ainda falta confirmar | `docs/pluggy/pendencias.md` |
| Próximos passos | `docs/roadmap/roadmap.md` (fases), `docs/roadmap/fase-N.md` (histórias e critérios de aceite) e as Issues do GitHub (status das tarefas, uma Milestone por fase; `docs/roadmap/backlog.md` até a migração) |
| Nomes de branch, commits e PRs | `docs/arquitetura/convencoes-de-git.md` |
| Uso do Claude no desenvolvimento (co-autoria, revisão, dados, sessões) | `docs/arquitetura/uso-de-ia-no-desenvolvimento.md` |

Leia só as notas do assunto da tarefa; não é preciso ler o vault inteiro.

## Regras de trabalho
- **Git no PC:** nunca fazer commit, push nem abrir PR sem perguntar antes. O padrão é deixar as alterações sem commitar e entregar o texto da mensagem de commit.
- **Branches:** `develop` (padrão) → `main`, sempre por PR; o trabalho sai da `develop` e volta para ela com squash, e a release é um PR `develop` → `main` com merge comum e tag. Correção urgente sai da `main`, e logo depois a `main` volta para a `develop` por merge (nunca reset nem squash). Detalhes em `docs/arquitetura/ambientes-e-branches.md`.
- **Git na nuvem (sessão do Claude Code):** pode commitar e dar push só na branch da sessão. PR só com pedido explícito, como rascunho; o roteiro está na skill `preparar-commit-e-pr`.
- **Autoria na nuvem:** a sessão começa com o git configurado como Claude. Antes do primeiro commit, rode `git config user.name "CaioQC"` e `git config user.email "129068301+CaioQC@users.noreply.github.com"` (e-mail *noreply* do GitHub, ligado à conta do Caio), para que o commit saia com a autoria do Caio.
- Commits e títulos de PR em Conventional Commits com escopo (`feat(api): ...`); branches `tipo/N-descricao` (número da Issue obrigatório em `feat` e `fix`). Detalhes em `docs/arquitetura/convencoes-de-git.md`.
- **Commit e PR: use a skill `preparar-commit-e-pr`.** Em resumo: co-autoria `Co-Authored-By: Claude <noreply@anthropic.com>` só quando o Claude escreveu parte relevante do diff; nunca o rodapé "Generated with Claude Code" nem outra atribuição; trabalho do Caio e do Claude em PRs separados, porque com squash a co-autoria marca o PR inteiro.
- **Links das notas:** depois de mexer em `.md`, rode a skill `checar-links`.
- **Dados bancários reais nunca vêm para a conversa:** JSON bruto da Pluggy, extratos, `.env` e backups não são colados nem lidos numa sessão do Claude; use as fixtures anonimizadas.
- **Depuração:** depois de 3 tentativas sem resolver o mesmo erro, pare, liste as hipóteses e pergunte ao Caio antes de continuar. Não conserte com base numa suposição que não foi verificada.
- **Saída de comando:** nunca traga log, saída de teste ou diff inteiros para a conversa; use `tail`, `grep` ou um intervalo e mostre só o comando que falhou e o trecho relevante do erro.
- **Agentes (`.claude/agents/`):** rode o `revisor-de-regras` uma vez por PR com código, antes de propor o commit. O `testador-do-core` está em avaliação; no código do Caio, só no modo casos. Detalhes em `docs/arquitetura/uso-de-ia-no-desenvolvimento.md`.
- **Uma sessão por tarefa.** Ao parar no meio, deixe na Issue o que foi feito, o que falta, onde parou e a branch (no PC, mostre o texto e publique só com o OK do Caio).
- **Processo congelado até o fim da Fase 1:** nenhuma regra, agente ou skill nova, a não ser que algo quebre na prática. O processo é revisto na retrospectiva de cada fase (`docs/roadmap/roadmap.md`).
- Não decida sozinho o que é escolha de produto: pergunte. Ao propor algo que contradiz uma ADR ou o registro de decisões, diga qual e por quê.

## Regras do vault (`docs/`)
- **Links Markdown relativos** (`[ADR 09](../adr/adr-09-....md)`), nunca wikilinks `[[...]]`. Link para a nota inteira, não para seções (Obsidian e GitHub geram âncoras diferentes).
- **Nomes de arquivo** em kebab-case, sem acento nem espaço; o título bonito vai no `#` dentro da nota.
- **Ao mover ou renomear uma nota, atualize todos os links para ela** (procure pelo nome do arquivo em `docs/`). O Obsidian só faz isso sozinho quando a mudança é feita dentro dele.
- Uma ideia por nota; não duplique conteúdo entre notas, linke.
- **Decisão de domínio ou de arquitetura** (ou que alguém poderia "corrigir" sem saber o motivo) entra no topo de `docs/decisoes/registro.md`, em até 5 linhas, e é aplicada na nota afetada. Mudança de processo ou de ferramenta fica só na mensagem do commit. ADR nova usa `docs/templates/adr.md` e entra na tabela de `docs/inicio.md`.
- Fato novo sobre a Pluggy vai em `docs/pluggy/fatos-verificados.md`, com a fonte.
- Tarefa nova vira Issue do GitHub (não use outra ferramenta de tarefas); o `docs/roadmap/backlog.md` vale só até a migração. Diagramas são em Mermaid dentro das notas, nunca imagem exportada.
- Nunca ponha dados bancários reais no repositório. O repositório é **público** (portfólio).
- Plugin da comunidade do Obsidian que guarde chave de API: `docs/.obsidian/plugins/` entra no `.gitignore` **antes** de qualquer commit.
- O backlog é só de tarefas do projeto; arrumação pessoal do repositório não entra no vault.

## Regras de código (quando houver código)
1. **Strict TypeScript:** todo o código fortemente tipado. Evite `any`.
2. **`@centavo/core` é puro:** nada de `pluggy-sdk`, banco, `process.env` ou segredos nele. Tipos financeiros e DTOs vêm dele; não os reimplemente no back nem no front.
3. **Pluggy e banco só em `apps/api`.**
4. **Valores monetários:** inteiros em centavos (`amountInCents`), circulando como `number`. Converta decimais da Pluggy só na borda, com o sinal derivado do `type` (no cartão a Pluggy manda compras positivas).
5. **Datas:** dia e mês sempre em `America/Sao_Paulo`.
6. **Idempotência:** toda escrita vinda da Pluggy é *upsert* por ID externo; exclusões são **soft delete**. O ID da Pluggy não é identidade permanente: para reconhecer a mesma operação use `provider_id` e, sem ele, a impressão digital.
7. **Item sem sucesso não apaga nada:** resposta vazia de item com consentimento expirado ou em erro nunca gera soft delete.
8. **Anotações do usuário são sagradas:** reconciliação e regras nunca sobrescrevem categoria manual, marcação manual de transferência ou observação; ao recriar uma transação, transfira-as.
9. **Transferências internas** ficam fora de orçamento, relatórios e projeções.
10. **Projeções são calculadas,** nunca gravadas como transações.
11. **Erros:** endpoints HTTP tratam exceções e retornam respostas padronizadas em JSON.
12. **Estilo AdonisJS 7:** Lucid ORM, VineJS para validação, injeção de dependência.
13. **IA só local e só sugere:** Ollama só em `apps/api`, em job assíncrono; dado bancário nunca vai para IA na nuvem; a IA nunca grava categoria sem aceite, nunca faz conta e nunca gera chave. Ver `docs/arquitetura/ia-local.md`.
14. **Teste de regressão:** todo bug corrigido vem com um teste no mesmo PR, escrito antes da correção e visto falhando sem ela. Ver `docs/arquitetura/testes.md`.
