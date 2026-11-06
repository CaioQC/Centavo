# Registro de decisões

Diário das decisões do projeto: o que foi decidido, **por quê** e o que foi descartado. Entrada nova no topo (modelo em [templates/decisao.md](../templates/decisao.md)). As regras vigentes ficam nas notas de [produto](../produto/decisoes-de-produto.md) e nas ADRs; aqui fica o raciocínio, para que ninguém (pessoa ou IA) "corrija" algo que foi decidido de propósito.

---

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
