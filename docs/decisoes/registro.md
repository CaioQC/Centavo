# Registro de decisões

Diário das decisões do projeto: o que foi decidido, **por quê** e o que foi descartado. Entrada nova no topo (modelo em [templates/decisao.md](../templates/decisao.md)). As regras vigentes ficam nas notas de [produto](../produto/decisoes-de-produto.md) e nas ADRs; aqui fica o raciocínio, para que ninguém (pessoa ou IA) "corrija" algo que foi decidido de propósito.

---

### 2026-11-08: Trabalho do Caio e do Claude em PRs separados
- **Decisão:** contribuições relevantes do Caio e do Claude vão em PRs separados, mesmo quando são da mesma Issue (`Refs #N` nos anteriores, `Closes #N` no último). Contribuições pequenas não separam PR nem mudam a co-autoria. PR misto inevitável leva a co-autoria e uma seção "Divisão do trabalho" na descrição, que entra no modelo de PR como campo opcional. Detalhes em [uso de IA no desenvolvimento](../arquitetura/uso-de-ia-no-desenvolvimento.md).
- **Motivo:** a linha de co-autoria vale para o commit inteiro, e o squash faz de cada PR um commit só. Num PR com back do Caio e front do Claude, a co-autoria daria a entender que o Claude fez os dois. PRs separados mantêm a autoria certa em cada commit e no `git blame`.
- **Alternativas descartadas:** só descrever a divisão no PR misto, como regra (a co-autoria continuaria marcando tudo); merge sem squash nos PRs mistos (quebraria a convenção de um commit por entrega).
- **Afeta:** [uso de IA no desenvolvimento](../arquitetura/uso-de-ia-no-desenvolvimento.md), [convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md), `.github/pull_request_template.md`, `CLAUDE.md`

### 2026-11-08: Co-autoria do Claude e política de uso de IA no desenvolvimento
- **Decisão:** commit em que o Claude escreveu parte relevante do diff leva `Co-Authored-By: Claude <noreply@anthropic.com>`; quando ele só revisou, explicou, sugeriu ou redigiu a mensagem de commit ou de PR, não leva. O Caio é sempre o autor. No PC o Claude propõe a linha e o Caio decide; na nuvem o Claude aplica o critério e o Caio confere na revisão. Em PR com co-autoria, a última linha da descrição é a linha de co-autoria, para ela sobreviver ao squash. Também: dado bancário real nunca vai para o Claude; PRs pequenos quando o Claude é o agente; o código do Claude segue as mesmas regras de qualidade. Tudo reunido em [uso de IA no desenvolvimento](../arquitetura/uso-de-ia-no-desenvolvimento.md).
- **Motivo:**
  - O Caio vai escrever boa parte do back-end à mão e usar o Claude como agente principalmente no front-end, área que domina menos. A co-autoria deve refletir quem fez o trabalho, não o simples uso da ferramenta.
  - Declarar o uso de IA no próprio commit é mais honesto e mais fácil de explicar num portfólio do que esconder.
  - A mensagem do squash é o título e a descrição do PR; sem a linha na descrição, a co-autoria se perderia na `develop`.
  - O Claude Code é IA na nuvem: a regra 13 (dado bancário nunca vai para IA na nuvem) vale para ele também, não só para o Ollama.
  - PR pequeno é o que torna a revisão do rascunho real.
- **Substitui:** a regra "sem atribuição a IA" do `CLAUDE.md`, que proibia qualquer co-autoria. A proibição do rodapé "Generated with Claude Code" nos PRs continua.
- **Alternativas descartadas:** sem atribuição nenhuma (a IA ficaria visível só na label do PR); co-autoria em todo commit em que o Claude ajudou (incluiria revisões e mensagens de commit); o Claude como autor (os commits não contariam como do Caio no gráfico de contribuições).
- **Não aplicado (por ora):** seção "Uso de IA" no README.
- **Afeta:** [uso de IA no desenvolvimento](../arquitetura/uso-de-ia-no-desenvolvimento.md), [convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md), `.github/pull_request_template.md`, `CLAUDE.md`

### 2026-11-08: PRs das sessões na nuvem: rascunho, assignee e label `claude`
- **Decisão:** branches `claude/...` só nas sessões do Claude Code na nuvem; no PC, o formato normal `tipo/N-descricao`. Todo PR aberto por uma sessão na nuvem nasce como rascunho, com o Caio como assignee e a label `claude`; só o Caio o tira de rascunho, depois de revisar, e então faz o merge. Detalhes em [convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md).
- **Motivo:**
  - Regulamentar o uso de IA no projeto: nada feito pelas sessões na nuvem entra sem revisão do Caio, e o histórico mostra o que foi feito com IA.
  - A ideia original era marcar o Caio como revisor, mas o GitHub não deixa pedir revisão ao autor do PR, e esses PRs saem com o usuário do Caio como autor. Rascunho dá o mesmo efeito: não aceita merge até alguém tirá-lo desse estado.
  - No PC, o Caio acompanha a sessão e faz ele mesmo o commit e o PR; a branch `claude/...` não acrescenta nada.
- **Alternativas descartadas:** Caio como revisor (o GitHub não permite para o autor do PR); exigir aprovação antes do merge (travaria todos os PRs, já que ninguém aprova o próprio PR).
- **Em aberto:** co-autoria das contribuições de IA nos commits. Resolvida no mesmo dia (entrada acima).
- **Afeta:** [convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md), `CLAUDE.md`

### 2026-11-08: Revisão das convenções de branch, commit e PR
- **Decisão:** número da Issue obrigatório na branch só em `feat`, `fix` e `hotfix`. Escopo novo `infra`. Descrição com verbo no presente, minúscula, sem ponto final, até ~70 caracteres. Títulos definidos para os PRs de promoção e de volta (`chore(release): ...`). Modelo de descrição de PR em `.github/pull_request_template.md`. No GitHub: squash usa título e descrição do PR, e a branch é apagada depois do merge. Detalhes em [convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md).
- **Motivo:**
  - Criar Issue para corrigir um erro de digitação na documentação é atrito; nas branches de funcionalidade e correção, o número mantém a ligação com a tarefa.
  - A CI vai barrar título fora do padrão, e os PRs de promoção e de volta não tinham título definido.
  - Docker Compose, backup e homologação não cabem em `api`, `web` nem `core`.
  - Os commits do histórico misturavam formas; um estilo só deixa as notas da release uniformes.
  - O modelo de PR junta num lugar as regras já decididas (teste de regressão, critérios, registro, hotfix de risco).
- **Resolve:** a revisão pendente das convenções (entrada de 2026-11-06 sobre Issues e convenções).
- **Alternativas descartadas:** número da Issue obrigatório em toda branch; sem escopo para infraestrutura.
- **Afeta:** [convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md), `.github/pull_request_template.md`, `CLAUDE.md`

### 2026-11-08: Stack de testes enxuta
- **Decisão:** só três ferramentas de teste: Vitest no `core` (com relógio falso), Japa na `api` e o mesmo Docker Compose do desenvolvimento, com banco separado para testes. Teste "golden" da reconciliação na Fase 2. Sem teste automatizado no `web` no começo. CI verde obrigatória para o merge nas três branches e *push protection* de segredos do GitHub. Detalhes em [testes](../arquitetura/testes.md).
- **Motivo:**
  - O pacote completo proposto (11 itens) era coisa demais para um projeto de uma pessoa que ainda está aprendendo a stack.
  - O risco do Centavo está em dinheiro, datas e reconciliação, que ficam no `core` e na `api`; o `web` só mostra dados, e a tela é testada à mão na homologação.
  - Docker Compose já existe para o desenvolvimento: uma ferramenta a menos que o Testcontainers. O *push protection* do GitHub é de graça e não exige configurar o gitleaks.
  - O que ficou de fora volta quando um tipo de bug se repetir.
- **Alternativas descartadas (por enquanto):** `fast-check`, Testcontainers, React Testing Library e MSW, Playwright, contrato semanal com a Pluggy, restauração mensal automática do backup, Stryker, cobertura mínima e gitleaks. Ficam em "Considerar depois" na nota de testes.
- **Afeta:** [testes](../arquitetura/testes.md), [stack](../arquitetura/stack.md), [roadmap](../roadmap/roadmap.md)

### 2026-11-08: Gestão de tarefas híbrida: especificação no vault, trabalho nas Issues
- **Decisão:** o `roadmap/fase-N.md` guarda as histórias e os critérios de aceite de cada fase, sem checkbox de status. As Issues do GitHub guardam o trabalho: status, branch, PR e discussão; a Issue de uma história aponta para ela no `fase-N.md` e nunca copia os critérios. Cada fase do roadmap é uma Milestone. Bugs, ideias soltas e dívida técnica existem só como Issue. Detalhes em [convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md).
- **Motivo:**
  - A especificação versionada junto com o código deixa um critério e o teste dele mudarem no mesmo PR, revisados no mesmo diff; e o `fase-N.md` mostra a fase inteira como um documento, no Obsidian e no portfólio.
  - As Issues trazem o que o vault não tem: número automático, status real, `Closes #N`, ligação automática com PRs, progresso por Milestone e edição pelo app do GitHub no celular.
  - Cada informação num lugar só evita que uma das cópias fique desatualizada.
- **Custo aceito:** dois lugares para consultar, cada um com uma pergunta certa.
- **Alternativas descartadas:** tudo nas Issues (a especificação sairia do diff do PR e do Obsidian); tudo no vault (sem número automático, status real nem automação).
- **Resolve:** a revisão pendente sobre gestão de tarefas da entrada de teste de regressão (abaixo).
- **Afeta:** [convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md), [testes](../arquitetura/testes.md), [roadmap](../roadmap/roadmap.md), `CLAUDE.md`

### 2026-11-08: Teste de regressão para todo bug e critérios de aceite no fase-N.md
- **Decisão:** todo bug corrigido (`fix/` ou `hotfix/`) vem com um teste de regressão no mesmo PR, escrito antes da correção e visto falhando sem ela, na camada mais baixa que reproduz o bug, citando a Issue. Bug causado por dado real da Pluggy vira fixture anonimizada; bug impossível de testar automaticamente é justificado no PR. Os critérios de aceite de cada funcionalidade ficam no `roadmap/fase-N.md` (Dado / Quando / Então), e a Issue aponta para eles; cada critério vira pelo menos um teste. Detalhes em [testes](../arquitetura/testes.md).
- **Motivo:**
  - Ideia ouvida pelo Caio (Akita no podcast Flow): um bug que já aconteceu mostra onde o código é frágil, e o teste trava esse ponto para que nenhuma release o traga de volta.
  - Teste escrito depois da correção pode passar com ou sem ela; vê-lo falhar antes prova que ele pega o bug.
  - Critérios no vault ficam versionados junto com o código e seguem a decisão de 2026-11-04 sobre histórias por fase.
- **Revisão pendente:** como as tarefas serão gerenciadas — manter o `roadmap/fase-N.md` ou passar histórias e critérios para as Issues. Resolvida no mesmo dia: híbrido (entrada acima).
- **Alternativas descartadas:** critérios de aceite no corpo de cada Issue (uma fonte só por tarefa, mas fora do repositório; volta na revisão acima); teste de regressão opcional.
- **Afeta:** [testes](../arquitetura/testes.md), [convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md), `CLAUDE.md`

### 2026-11-06: Tarefas nas Issues do GitHub; convenções de branch e commit
- **Decisão:** as tarefas do projeto passam a ser **Issues do GitHub**, e o número da Issue entra no nome da branch. Branches no formato `tipo/N-descricao-curta` (tipos `feat`, `fix`, `hotfix`, `docs`, `refactor`, `test`, `chore`, `ci`). Commits e títulos de PR em Conventional Commits com escopo da parte do monorepo (`feat(api): ...`). Detalhes em [convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md).
- **Motivo:**
  - O Caio quer o número da tarefa no nome da branch. Numerar à mão no `backlog.md` geraria números repetidos quando o PC e uma sessão na nuvem criassem tarefas ao mesmo tempo; a Issue dá número automático e é fechada sozinha pelo PR (`Closes #N`).
  - O motivo da decisão de 2026-11-04 (as sessões na nuvem só enxergam o repositório) deixou de valer: elas leem e escrevem Issues pelo GitHub. A própria decisão já apontava as Issues como a próxima opção.
  - Com squash na `develop`, o título do PR vira o commit e a linha das notas da release; por isso o padrão vale principalmente para ele.
  - `hotfix/` separado de `fix/` mostra pelo nome qual branch saiu da `main` e precisa voltar para a `develop`.
- **Revisão pendente:** o Caio vai rever estas convenções e o uso das Issues. Resolvida em 2026-11-08: gestão híbrida e revisão das convenções (entradas acima).
- **Pendente:** migrar os itens do [backlog](../roadmap/backlog.md) para Issues; até lá, ele segue valendo.
- **Substitui:** "Lista de tarefas no vault, não no Trello" (2026-11-04).
- **Alternativas descartadas:** numerar as tarefas à mão no backlog (números repetidos); branch sem número da tarefa.
- **Afeta:** [convenções de branch, commit e PR](../arquitetura/convencoes-de-git.md), [backlog](../roadmap/backlog.md), `CLAUDE.md`

### 2026-11-06: Backup com retenção e cópia criptografada
- **Decisão:** além do `pg_dump` diário, um backup logo antes de cada atualização da produção. Retenção: 7 diários, 4 semanais, 12 mensais e os 3 feitos antes de release. A cópia que sai do PC é criptografada antes (`age` ou `gpg`), com a chave num gerenciador de senhas. Detalhes em [backup](../arquitetura/backup.md).
- **Motivo:**
  - O banco de um usuário só é pequeno (estimativa: dezenas de MB em 10 anos, poucos MB por backup compactado); o que cresce é guardar todas as cópias para sempre, e a retenção resolve isso com umas 25 cópias.
  - A cópia fora da máquina tem todo o histórico bancário: o risco real é privacidade, não espaço.
  - Voltar para a release anterior não desfaz uma migration; o backup antes da atualização sim.
- **Revisão pendente:** o Caio aceitou as sugestões para revisar depois; os números da retenção podem mudar.
- **Alternativas descartadas:** guardar todos os backups (cresce sem limite); cópia fora da máquina sem criptografia.
- **Afeta:** [backup](../arquitetura/backup.md), [segurança e operação](../arquitetura/seguranca-e-operacao.md), [roadmap](../roadmap/roadmap.md)

### 2026-11-06: Releases a cada chegada à main
- **Decisão:** cada promoção da `homolog` para a `main` e cada hotfix geram uma release do GitHub, criada no commit da `main` depois do merge. SemVer: `0.x.y` até o fim do MVP (Fase 6), `1.0.0` nele; promoção sobe o número do meio e hotfix o último. Notas geradas pelo GitHub e revisadas, sem `CHANGELOG.md`. A produção roda a tag da release, com backup logo antes de atualizar. Detalhes em [ambientes, branches e releases](../arquitetura/ambientes-e-branches.md).
- **Motivo:**
  - A ideia do Caio era gerar a release ao fim do teste final na homologação; ela nasce na `main` porque é o commit da `main` que roda na produção.
  - Uma release por promoção, e não por fase: uma fase pode ter várias etapas promovidas. A fase aparece nas notas.
  - Rodar a tag deixa claro qual versão está na produção e torna a volta simples (tag anterior + backup).
  - Os PRs de feature já entram com squash e título `feat:` / `fix:`, então as notas automáticas saem organizadas.
- **Revisão pendente:** o Caio aceitou as sugestões para revisar depois.
- **Substitui:** a tag "uma por fase do roadmap" da entrada sobre branches (abaixo).
- **Alternativas descartadas:** release no commit da `homolog` (não é o que roda na produção); uma release por fase; `CHANGELOG.md` (duplica as releases); automação com release-please já de início (fica para quando a CI existir).
- **Afeta:** [ambientes, branches e releases](../arquitetura/ambientes-e-branches.md), [backup](../arquitetura/backup.md)

### 2026-11-06: Hotfix na main e volta da main para a develop
- **Decisão:** bug achado na produção é corrigido por hotfix: branch a partir da `main`, PR para a `main` e tag de correção. **Logo depois de cada hotfix**, e também depois de cada promoção conferida para a `main`, a `main` volta para a `develop` por PR com **merge comum**. Bug achado no desenvolvimento ou na homologação continua sendo corrigido na `develop`. Detalhes em [ambientes e branches](../arquitetura/ambientes-e-branches.md).
- **Motivo:** mesmo depois da homologação, bugs chegam à `main`; corrigi-los pela `develop` faria a correção esperar a etapa inteira. Voltar a `main` para a `develop` deixa as branches iguais e evita conflitos.
- **Por que logo após cada hotfix:** esperar a produção estabilizar deixaria a `develop` sem a correção (o bug reaparece no desenvolvimento e os conflitos crescem) e a homologação testaria uma versão diferente da que vai para a `main`.
- **Por que merge:** um reset da `develop` apagaria o trabalho da etapa seguinte; um squash faria as branches divergirem.
- **Hotfix de risco testado antes:** quando o hotfix mexe em migration, reconciliação ou anotações, ele roda primeiro na instância de homologação (banco restaurado do backup), sem passar pela branch `homolog`. Um bug que escapou para a produção não estava previsto pelos testes, e a correção dele também pode ter efeitos imprevistos sobre dados que só existem no Centavo. Nos demais hotfixes o teste é opcional, para não atrasar correções simples.
- **Substitui:** a regra "toda correção nasce na `develop`", com hotfix só como exceção para defeito urgente (entrada abaixo).
- **Alternativas descartadas:** voltar a `main` para a `develop` só depois de a produção estabilizar; atualizar a `develop` com reset para a `main`; só fazer backup logo antes do hotfix de risco (garante a volta, mas não evita o estrago); testar todo hotfix na homologação (atrasa correções simples).
- **Afeta:** [ambientes e branches](../arquitetura/ambientes-e-branches.md), `CLAUDE.md`

### 2026-11-06: Branches develop, homolog e main, com homologação numa segunda instância
- **Decisão:** três branches fixas. O trabalho sai da `develop` (branch padrão) e volta por PR com squash; cada etapa sobe `develop` → `homolog` → `main` por PR com merge comum, e cada chegada à `main` ganha uma tag de versão. `homolog` e `main` só recebem PR. A homologação é uma **segunda instância no PC**, com o banco restaurado do último backup da produção. Detalhes em [ambientes e branches](../arquitetura/ambientes-e-branches.md).
- **Motivo:**
  - Treinar o fluxo usado em empresa e mostrar um processo organizado no portfólio.
  - O banco do Centavo é o único arquivo do passado: versão nova (migration, reconciliação) é testada numa cópia, não no banco do dia a dia.
  - Restaurar o backup a cada promoção prova que ele funciona ("restauração testada" em [segurança e operação](../arquitetura/seguranca-e-operacao.md)).
  - Squash só nas features: nas promoções ele faria as branches divergirem.
  - `develop` como padrão faz as sessões na nuvem partirem dela.
- **Custo aceito:** três PRs por entrega até a `main`, num projeto de uma pessoa.
- **Início:** vale a partir do PR seguinte ao #1. O PR #1, aberto antes da decisão, vai direto para a `main`, e as branches `develop` e `homolog` são criadas depois dele.
- **Alternativas descartadas:** só `main` e branches de trabalho (menos atrito, mas sem etapa de teste com dados reais); `homolog` só como branch, sem ambiente (seria só um nome); testar direto no banco de produção (risco ao único arquivo do passado); squash também nas promoções.
- **Afeta:** [ambientes e branches](../arquitetura/ambientes-e-branches.md), [segurança e operação](../arquitetura/seguranca-e-operacao.md), [roadmap](../roadmap/roadmap.md), `CLAUDE.md`

### 2026-11-06: Apoio à declaração do Imposto de Renda na Fase 7
- **Decisão:** a Fase 7 (pós-MVP) ganha um [apoio à declaração do IRPF](../fluxos/imposto-de-renda.md), em três partes por prioridade: saldos em 31/12 de contas e investimentos; despesas dedutíveis do ano; e, com menor prioridade, um checklist anual de informes. O Centavo confere e organiza; não calcula imposto nem restituição.
- **Motivo:**
  - Conselho de um colega de trabalho: declarar mesmo sem ser obrigado, para pegar prática e recuperar imposto retido no salário.
  - O cálculo depende do informe do empregador (bruto, IR retido), que o Centavo não vê. A pré-preenchida da Receita já traz o informe, as despesas de saúde e os saldos, mas costuma falhar nos saldos; conferir é onde o Centavo agrega.
  - Relatórios ficaram fora do MVP (2026-11-02), por isso a Fase 7. Saldos e categorias já são gravados desde as fases 2 e 3, então nada precisa ser antecipado.
- **Alternativas descartadas:** ideia futura fora do roadmap, como o app mobile; calcular imposto ou restituição (faltam os dados do empregador e duplicaria o programa da Receita).
- **Afeta:** [apoio ao IR](../fluxos/imposto-de-renda.md), [roadmap](../roadmap/roadmap.md), [decisões de produto](../produto/decisoes-de-produto.md), [pendências](../pluggy/pendencias.md)

### 2026-11-06: IA local (Ollama) a partir da Fase 3, só como sugestão
- **Decisão:** o Centavo usa uma IA **só local** (Ollama + Qwen no PC) para quatro coisas: sugerir categoria, sugerir regra, responder perguntas sobre os gastos e resumir o mês. A sugestão de categoria vai para a lista "revisar" e só vale quando o usuário aceita; a [ADR 07](../adr/adr-07-categorizacao-em-camadas.md) não ganha camada nova. Entra na Fase 3; o resumo do mês entra na Fase 4. Aceitar uma sugestão grava a categoria como `MANUAL`. Regras em [IA local](../arquitetura/ia-local.md).
- **Motivo:**
  - Dado bancário real não deve sair do PC; com o Ollama, nada vai para a nuvem.
  - A categoria da Pluggy pode vir vazia ([ADR 07](../adr/adr-07-categorizacao-em-camadas.md)); a IA cobre justamente essa lacuna.
  - O hardware já existe (RX 9060 XT 16 GB). A ideia veio do projeto parecido de um amigo, com Ollama e Qwen.
  - Modelo erra e responde diferente a cada execução: começar sugerindo, medir a taxa de acerto e só então pensar em automatizar.
  - A Fase 3 é onde nascem extrato, categorias, regras e a lista "revisar", que a IA usa. O resumo do mês só faz sentido com o orçamento, que nasce na Fase 4.
  - A categoria aceita fica protegida como qualquer escolha do usuário.
- **Observação:** o resumo do mês narra números já calculados; não é o módulo de relatórios, que segue fora do MVP.
- **Alternativas descartadas:** origem própria para a categoria aceita (ex.: `AI_ACCEPTED`), que ajudaria a medir o acerto, mas não foi preferida; resumo do mês na Fase 3 (só teria os gastos, sem o orçamento); camada `AI` que aplica a categoria sozinha (reavaliar com a taxa de acerto medida); IA na nuvem, inclusive como alternativa quando o Ollama estiver fora do ar (dados bancários sairiam do PC); nome legível do estabelecimento (pouco valor por ora); fase própria depois do MVP.
- **Afeta:** [IA local](../arquitetura/ia-local.md), [ADR 07](../adr/adr-07-categorizacao-em-camadas.md), [roadmap](../roadmap/roadmap.md), [stack](../arquitetura/stack.md), [decisões de produto](../produto/decisoes-de-produto.md)

### 2026-11-04: Web com Vite + React Router no lugar do Next.js; mobile vira ideia futura
- **Decisão:** o `web` é um SPA com **Vite + React + React Router (modo SPA) + TanStack Query**, falando com a API pelo Tuyau. O AdonisJS serve o build estático na mesma origem; em desenvolvimento, o proxy do Vite encaminha `/api/*`. O app mobile sai do roadmap e do monorepo e fica como **ideia futura**; a [ADR 05](../adr/adr-05-offline-first-mobile.md) foi suspensa.
- **Motivo:**
  - O Centavo é um painel atrás de login, para um usuário, na rede local: não usa renderização no servidor nem SEO, que são o ponto forte do Next. Sem o servidor do Next, some o *rewrite* que existia só para o cookie de sessão funcionar.
  - Vite compartilha o ecossistema do Vitest, já escolhido para os testes.
  - React Router em vez de TanStack Router por ser o roteador mais comum no mercado (a tipagem das rotas do TanStack Router era a vantagem dele).
  - O Caio não planeja atuar com mobile; o app era um extra. Foco no web.
- **Revisão pendente:** a escolha do front será revista com um dev front-end do trabalho do Caio antes da Fase 0 ([backlog](../roadmap/backlog.md)).
- **Alternativas descartadas:** Next.js (padrão de mercado, mas traz um servidor sem uso aqui); Inertia + React pelo *starter kit* do AdonisJS 7 (acopla o front ao Adonis); TanStack Start e React Router em modo framework (trazem de volta um servidor de renderização); Vue ou Svelte (sem motivo para sair de React).

### 2026-11-04: Abordagem de documentação e diagramas (diferente do Garago)
- **Decisão:** sem documento de requisitos formais, sem casos de uso e sem diagrama de classes feito à mão. Histórias de usuário com **critérios de aceite**, escritas no início de cada fase (`roadmap/fase-N.md`). Diagramas em **Mermaid** dentro das notas, só onde valem: um de arquitetura de contêineres, ER por domínio e sequência dos fluxos difíceis (reconciliação, troca de anotações, renovação/reconexão). Os diagramas foram **adiados** por escolha do Caio; estão no [backlog](../roadmap/backlog.md).
- **Motivo:** a documentação do Garago era acadêmica (equipe, avaliação) e envelheceu (previa Abacate Pay, o time implementou Stripe). O Centavo tem um único usuário, que também é o dono do produto: casos de uso não informam nada, requisitos formais duplicariam as decisões de produto e as ADRs, e diagrama de classes à mão perde para o código. Mermaid é texto: renderiza no Obsidian e no GitHub, tem diff no git e o Claude consegue editar; imagem exportada (draw.io, Astah) só o autor atualiza. A parte de transações do modelo depende das [pendências](../pluggy/pendencias.md), então não vale detalhar antes da Fase 2.
- **Regra:** diagrama é atualizado no mesmo commit da migration ou do fluxo que ele descreve; uma fase só termina quando notas e diagramas batem com o código.
- **Alternativas descartadas:** repetir o pacote do Garago (histórias, requisitos, arquitetura e todos os diagramas antes do código); não documentar nada até o código existir.

### 2026-11-04: Lista de tarefas no vault, não no Trello
- **Decisão:** tarefas soltas ficam em [roadmap/backlog.md](../roadmap/backlog.md), com checkboxes.
- **Motivo:** as sessões do Claude na nuvem só enxergam o repositório; um quadro no Trello seria uma segunda fonte de "o que falta", invisível para elas e divergente do roadmap.
- **Alternativas descartadas:** Trello (kanban visual, mas fora do repositório). Se o projeto ganhar mais pessoas, a próxima opção são as Issues do GitHub.

### 2026-11-04: Documentação vira um vault do Obsidian dentro do repositório
- **Decisão:** a spec única (`plan_de_arquitetura_financeiro.md`) foi dividida em notas pequenas neste vault (`docs/`), versionado no repositório `centavo`.
- **Motivo:** o trabalho vai alternar entre PC e sessões do Claude Code na nuvem (pelo celular). Sessões novas não enxergam conversas anteriores; o contexto precisa morar no repositório. Notas pequenas deixam cada sessão ler só o necessário. Ideia inspirada no vault do Tech Lead no trabalho.
- **Alternativas descartadas:** aba de Projetos do Claude (bom para conversar, mas não edita o repositório; o conteúdo ficaria duplicado e desatualizado); manter um arquivo único (caro de ler a cada sessão).

### 2026-11-04: Links Markdown em vez de wikilinks
- **Decisão:** links entre notas no formato `[texto](caminho/relativo.md)`; nomes de arquivo em kebab-case, sem acento nem espaço.
- **Motivo:** no Obsidian (PC) os dois funcionam igual; links Markdown deixam o Claude abrir a nota direto pelo caminho e também funcionam no GitHub.
- **Custo aceito:** mover ou renomear nota fora do Obsidian exige atualizar os links (regra no `CLAUDE.md`). Links para seções foram evitados porque Obsidian e GitHub geram âncoras diferentes.

### 2026-11-04: Celular só para planejamento
- **Decisão:** no celular, sessões do Claude Code na nuvem sobre o repositório; leitura pelo GitHub ou pela própria sessão. Obsidian só no PC.
- **Motivo:** pouco tempo na semana; o ônibus serve para planejar. O principal é funcionar bem no computador.

### 2026-11-02: Correções da revisão crítica, com base na documentação da Pluggy
Revisão do plano feito originalmente com o Gemini. O que mudou e por quê:
- **`@centavo/core` sem a `pluggy-sdk`:** o pacote é importado pelo front; com a SDK dentro, código de servidor e segredo iriam para o navegador. A Pluggy e o banco ficam só em `apps/api`. O pacote `database` compartilhado foi removido (models Lucid não servem para o front).
- **Reconciliação como fonte da verdade** ([ADR 03](../adr/adr-03-reconciliacao-periodica.md)): a Pluggy só tenta entregar o webhook 3 vezes; com a API no PC local, eventos se perdem.
- **Soft delete + `provider_id` + impressão digital** ([ADR 02](../adr/adr-02-idempotencia-e-ciclo-de-vida.md), [ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md)): a Pluggy recria transações de cartão com ID novo; sem isso, categorias manuais sumiriam no fechamento da fatura.
- **Saldo vem da Pluggy** ([ADR 04](../adr/adr-04-saldos-da-pluggy.md)): somar transações divergiria do saldo real (histórico limitado a ~12 meses). Substituiu a ADR 04 original.
- **Investimentos em tabela própria:** na Pluggy eles não são contas.
- **Fuso horário explícito** ([ADR 10](../adr/adr-10-datas-e-fuso-horario.md)): sem isso, compras no fim do dia cairiam no mês errado.
- **Sinal pelo campo `type`:** no cartão a Pluggy manda compras positivas, o inverso da conta corrente.
- **Túnel só para o webhook + backup obrigatório + estratégia de testes:** dados bancários reais e o banco local como único arquivo do passado.
- **Renovação anual do Meu Pluggy:** a autorização dura um ano e a reconexão pode gerar Item ID novo; contas e transações precisam ser religadas sem duplicar.

### 2026-11-02: Cartão no orçamento: mês da compra, parcelado
- **Decisão:** compra à vista conta no mês da compra; a parcela *k* conta no mês da compra + (*k* − 1) ([ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md)).
- **Motivo:** feedback imediato do gasto, sem distorcer o mês com o valor total de uma compra parcelada.
- **Alternativas descartadas:** mês da fatura (regime de caixa; compra após o fechamento só aparece no mês seguinte); valor total no mês da compra (distorce o mês).

### 2026-11-02: Decisões de produto e infraestrutura do MVP
Tomadas em três rodadas de perguntas ([decisões de produto](../produto/decisoes-de-produto.md)):
- **Só um usuário:** é uso pessoal. Mantém `user_id` nas tabelas por custo baixo e valor de portfólio.
- **AdonisJS 7:** mantido do plano original (escolha consciente: aprender a stack, TypeScript ponta a ponta). Alternativas: Spring Boot (área de domínio do Caio), NestJS.
- **Funcionalidades núcleo:** orçamento por categoria, projeção de fatura, metas. Relatórios e alertas ficaram fora.
- **MVP Backend + Web**, mobile depois.
- **Categorias:** Pluggy mapeada + recategorização + regras. **Orçamento:** por mês, ajustável, copiando o anterior. **Metas:** vinculadas ou com aportes manuais. **Projeção:** parcelas, assinaturas e ritmo de gasto.
- **Hospedagem local + túnel**; **Redis + BullMQ** (padrão de mercado, conta no portfólio); **lançamentos manuais** sim; **transferências internas** detectadas e ignoradas.
- **Meu Pluggy** em vez do widget Pluggy Connect: gratuito para uso pessoal; o widget depende do trial ou de plano pago.
- **2FA TOTP:** dados bancários reais justificam. **Sem prazo:** projeto de estudo contínuo.

### 2026-11-02: Nome "Centavo"
- **Decisão:** o projeto se chama Centavo; pacotes `@centavo/*`.
- **Motivo:** remete à ADR 01 (valores em centavos); curto e brasileiro. "SyncFinance" foi considerado e descartado por ser genérico.
- **Observação:** já existe um app de finanças pessoais chamado Centavo na App Store (Product Hunt, 02/2026). Não atrapalha um projeto pessoal; só seria problema se virasse produto público.
