# Uso de IA no desenvolvimento

Regras para o uso do Claude Code no desenvolvimento do Centavo: o que ele pode fazer, como o Caio mantém o controle e como a contribuição dele aparece no histórico. A IA **dentro do produto** é outro assunto ([IA local](ia-local.md)). O porquê está no [registro de decisões](../decisoes/registro.md).

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

## Revisão possível
- **PRs pequenos quando o Claude é o agente:** um assunto por PR, para a revisão ser de verdade.
- **Mesmas regras de qualidade:** o código escrito pelo Claude segue as mesmas exigências do código do Caio: testes, critérios de aceite do `fase-N.md` e teste de regressão ([testes](testes.md)).
