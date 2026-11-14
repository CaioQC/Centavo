# Uso de IA no desenvolvimento

Regras para o uso do Claude Code no desenvolvimento do Centavo: o que ele pode fazer, como o Caio mantém o controle, como a contribuição dele aparece no histórico e como o trabalho se divide entre sessões. A IA **dentro do produto** é outro assunto ([IA local](ia-local.md)). O porquê está no [registro de decisões](../decisoes/registro.md).

## Onde o Claude age
- **No PC:** o Caio acompanha a sessão. O Claude nunca faz commit, push nem PR sem perguntar; o padrão é deixar as alterações sem commitar e entregar o texto da mensagem de commit. Não se usa branch `claude/...`; vale o formato normal ([convenções](convencoes-de-git.md)).
- **Na nuvem (celular):** o Claude trabalha numa branch `claude/...`, de nome fixo. Pode commitar e dar push nela, com o git configurado com a autoria do Caio. PR só com pedido explícito, e todo PR aberto por uma sessão na nuvem:
  - é aberto como **rascunho** (*draft*), que não aceita merge;
  - tem o **Caio como assignee**;
  - leva a label **`claude`**, que mostra no histórico o que foi feito com IA.
- **Só o Caio tira o PR de rascunho** ("Ready for review"), depois de revisar; só então faz o merge.
- **Por que não "revisor":** o GitHub não deixa pedir revisão ao autor do PR, e os PRs abertos pelas sessões saem com o usuário do Caio como autor. Pelo mesmo motivo, exigir aprovação antes do merge travaria todos os PRs do projeto.
- **Escolha de produto é do Caio:** o Claude propõe e pergunta, não decide.

## Co-autoria
- **Pergunta-guia:** quem escreveu o que está no diff?
- **Com co-autoria:** o Claude escreveu uma parte relevante do diff. Ex.: o front-end que o Caio descreve, revisa e manda ajustar; notas do vault redigidas pelo Claude a partir das decisões do Caio.
- **Sem co-autoria:** o Caio escreveu o conteúdo, e o Claude só revisou, explicou, sugeriu ou redigiu a mensagem de commit ou de PR. Ex.: o back-end escrito à mão.
- **O Caio é sempre o autor:** revisou e responde pela mudança.
- **Formato:** última linha da mensagem de commit, sem o nome do modelo:

  ```
  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

- **Quem decide:** no PC, o Claude entrega a mensagem de commit já com ou sem a linha e diz por quê; a palavra final é do Caio. Na nuvem, o Claude aplica o critério ao commitar, e o Caio confere na revisão do rascunho.
- **Squash:** a mensagem do squash é o título e a descrição do PR, então a linha dos commits da branch não chega à `develop`. Quando o PR tem commits com co-autoria, **a última linha da descrição do PR é a linha de co-autoria**.
- **Sem rodapé "Generated with Claude Code"** nem outra atribuição nos PRs: a label `claude` e a co-autoria já cumprem esse papel.
- **Vale a partir de 2026-11-08:** commits anteriores ficam como estão.

### Separar o trabalho de cada um
A linha de co-autoria vale para o commit inteiro, e cada PR vira um commit só na `develop` (squash). Por isso a divisão por autor acontece no PR:
- **Contribuições relevantes do Caio e do Claude vão em PRs separados,** mesmo quando são da mesma Issue. Ex.: na Issue #12, `feat/12-api-login-totp` (back do Caio, sem co-autoria, `Refs #12`) e depois `feat/12-web-login-totp` (front do Claude, com co-autoria, `Closes #12`). Na `develop` ficam dois commits, e o `git blame` mostra quem escreveu cada linha.
- **Contribuições pequenas não separam PR:** se o Claude ajusta poucas linhas no PR do Caio, não há co-autoria; se o Caio ajusta poucas linhas no PR do Claude, a co-autoria continua.
- **PR misto inevitável** (back e front que não fazem sentido separados): leva a co-autoria e uma seção **"Divisão do trabalho"** na descrição, dizendo quem fez o quê (ex.: "API (`apps/api/...`): Caio. Telas (`apps/web/...`): Claude"). Como a descrição vira o corpo do commit do squash, a explicação fica no histórico. É a exceção.

## Dados bancários reais nunca vão para o Claude
O Claude Code é IA na nuvem. Nada de colar numa conversa, nem no PC: JSON bruto da Pluggy, extratos, saldos reais, o `.env` ou backups. Para depurar, usar as fixtures anonimizadas ([testes](testes.md)). É a mesma regra da IA do produto ([IA local](ia-local.md)).

## Sessões do Claude Code
O contexto de uma sessão é limitado: quando enche, a conversa é compactada e detalhes se perdem. Por isso cada sessão é **descartável**: tudo o que importa fica no repositório, e uma sessão nova recomeça lendo o `CLAUDE.md`, o vault e a Issue, não a conversa anterior. Vale para o PC e para as sessões na nuvem pelo celular.

### Uma sessão por tarefa
- **O tamanho de uma sessão é o de um PR:** Issue nova ou PR novo, sessão nova. Merge feito, a sessão daquele PR acabou. Com o trabalho do Caio e do Claude em PRs separados (acima), a mesma Issue pode ter mais de uma sessão.
- **Planejar e implementar em sessões separadas:** planejamento (escopo, arquitetura, decisões, `fase-N.md`) numa sessão com modelo mais capaz, muitas vezes no celular; implementação numa sessão nova, a partir do que foi registrado no vault, com o modelo escolhido pela parte (abaixo).
- **Desvio longo** (um bug que puxa uma depuração demorada): sessão própria para ele, e volta.

### Sinais de que é hora de trocar
- A conversa foi compactada: a partir daí a sessão já perdeu detalhes. Feche a tarefa atual e siga numa sessão nova.
- O Claude esquece regras do `CLAUDE.md` ou repete perguntas já respondidas.
- A tarefa mudou de assunto.

### Passagem de bastão
1. **Decisões no vault:** [registro de decisões](../decisoes/registro.md), notas e ADRs, como já é regra.
2. **Estado da tarefa na Issue:** ao encerrar uma sessão no meio do trabalho, o Claude deixa um comentário na Issue com o que foi feito, o que falta, onde parou e o nome da branch. A sessão seguinte começa lendo a Issue. No PC, como no commit, ele mostra o texto e só publica com o OK do Caio. Nada de arquivo de "handoff" solto: tarefa vive na Issue ([convenções](convencoes-de-git.md)).
3. **Trabalho salvo na branch:** a sessão seguinte parte de commits, não de alterações soltas na pasta.
   - **No PC:** o trabalho fica commitado na branch `tipo/N-descricao` (com o OK do Caio), e a sessão seguinte continua nela.
   - **Na nuvem, a tarefa cabe numa sessão:** cada sessão tem a sua branch `claude/...` e só dá push nela, então trabalho pela metade não passa para a sessão seguinte. Se a tarefa não couber, divida em PRs menores (`Refs #N`), cada um terminado na sua sessão. Na prática a nuvem é para planejamento (sem Docker, os testes da `api` não rodam lá), que raramente deixa código pela metade. Se o caso aparecer, o teste de continuar numa branch `claude/...` existente está no [backlog](../roadmap/backlog.md).

### Contexto enxuto
- **`CLAUDE.md` curto:** ele entra em toda sessão, a cada mensagem. Regra de uma parte só do código vai num `CLAUDE.md` da pasta dela (`apps/api/CLAUDE.md`, `apps/web/CLAUDE.md`), que o Claude Code só carrega quando trabalha ali. O da raiz fica com o que vale para tudo. Hoje as regras de código são poucas e quase todas valem para `core` e `api` juntos; a divisão fica para quando uma pasta tiver regras só dela ([backlog](../roadmap/backlog.md)).
- **Subagentes para leitura pesada** (varrer código, rodar a suíte, ler logs): o resultado volta resumido e a conversa principal não carrega o volume.
- **Leia só as notas do assunto:** a regra do `CLAUDE.md` vale também para o pedido que abre uma sessão nova; aponte as notas e a Issue, não as cole.

### Sessões em paralelo e custo
- Tarefas independentes (ex.: a API de uma Issue e o web de outra) podem rodar em sessões paralelas, sem tocar nos mesmos arquivos: no PC, cada uma na sua *worktree*; na nuvem, cada sessão já tem a sua cópia e a sua branch.
- Todas consomem o mesmo limite de uso do plano: duas sessões ao mesmo tempo gastam o dobro. Paralelo só quando o prazo pede.
- **Modelo por tarefa:** o mais leve que resolve, escolhido pela parte do código, não pela etapa. Planejamento e decisões difíceis num modelo maior. Na implementação: telas e CRUD num intermediário; regra de domínio escrita pelo Claude (`core`, reconciliação, [ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md), parcelas) num modelo maior, porque é ali que aparece o bug sutil. Busca e varredura no menor.

## Revisão possível
- **PRs pequenos quando o Claude é o agente:** um assunto por PR, para a revisão ser de verdade.
- **Mesmas regras de qualidade:** o código escrito pelo Claude segue as mesmas exigências do código do Caio: testes, critérios de aceite do `fase-N.md` e teste de regressão ([testes](testes.md)).
