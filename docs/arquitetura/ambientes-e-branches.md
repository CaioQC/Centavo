# Ambientes, branches e releases

Como o código sai da máquina de desenvolvimento e chega ao Centavo do dia a dia. O porquê está no [registro de decisões](../decisoes/registro.md).

## Branches
| Branch | Papel |
|---|---|
| `main` | Produção: a versão que roda o Centavo do dia a dia. Só recebe PR. |
| `homolog` | Homologação: a versão em teste na instância de homologação. Só recebe PR. |
| `develop` | Integração e **branch padrão** do GitHub. As sessões do Claude Code na nuvem partem dela. |
| branches de trabalho | Criadas a partir da `develop`, uma por entrega. Nas sessões na nuvem, é a branch da sessão. |

## Fluxo
1. **Trabalho:** branch a partir da `develop` → PR para a `develop`, com **squash** (um commit limpo por entrega).
2. **Homologação:** etapa pronta → PR `develop` → `homolog`, com **merge comum, sem squash**. Testa na instância de homologação.
3. **Produção:** aprovado → PR `homolog` → `main`, com **merge comum, sem squash** → **release** no commit da `main` (seção "Releases", abaixo).
4. **Volta para a develop:** conferida a produção, PR `main` → `develop`, com **merge comum, sem squash**, para as branches ficarem iguais.

- **A promoção é sempre para cima** e sempre por PR.
- **Sem squash nas promoções nem na volta:** com squash, as branches divergem e o PR seguinte traz commits antigos ou conflito.
- **A volta é merge, nunca reset da `develop`:** a etapa seguinte pode já estar sendo desenvolvida nela, e um reset apagaria esse trabalho.

## Correções
- **Bug achado no desenvolvimento ou na homologação:** corrigido na `develop` e sobe pelo fluxo normal.
- **Bug achado na produção (hotfix):** branch a partir da `main` → PR para a `main` (pode ser com squash; a branch do hotfix é descartada) → release de correção (ex.: `v0.4.0` → `v0.4.1`) → **logo em seguida**, PR `main` → `develop`, com merge comum.
- **Hotfix que mexe em migration, reconciliação ou anotações do usuário** é testado antes na **instância** de homologação: ela roda a branch do hotfix com o banco restaurado do último backup, sem passar pela branch `homolog`. Esse tipo de correção pode estragar dados que só existem no banco do Centavo (anotações e histórico além dos ~12 meses da Pluggy). Nos outros hotfixes (texto, filtro de tela, cálculo só da interface), o teste é opcional.
- **A volta do hotfix não espera a produção estabilizar** e acontece sempre antes da próxima promoção para a `homolog`: sem ela, a `develop` fica sem a correção (o mesmo bug reaparece no desenvolvimento e os conflitos crescem) e a homologação testaria uma versão diferente da que vai para a `main`. A `homolog` recebe a correção na promoção seguinte.

## Releases
- **Onde nasce:** no commit da `main` depois do merge da `homolog`, porque é ele que roda na produção (o commit da `homolog` é outro).
- **Quando:** a cada promoção para a `main` e a cada hotfix. A fase do [roadmap](../roadmap/roadmap.md) aparece nas notas, não no número.
- **Numeração (SemVer):** `0.x.y` até o MVP ficar pronto (fim da Fase 6) e `1.0.0` nele. Promoção sobe o número do meio (`0.3.0` → `0.4.0`); hotfix sobe o último (`0.4.0` → `0.4.1`).
- **Notas:** geradas pelo GitHub ("Generate release notes", que lista os PRs desde a release anterior) e revisadas à mão, em português. Sem `CHANGELOG.md`: duplicaria as releases.
- **A produção roda a release, não a `main`:** a instância de produção usa a tag (ex.: `v0.4.0`), e não a ponta da `main`. Sempre se sabe qual versão está rodando.
- **Atualizar a produção:** [backup](backup.md) logo antes → trocar para a tag nova. **Voltar atrás:** tag anterior + restaurar esse backup (a tag anterior sozinha não desfaz uma migration).
- **Automação depois:** release manual com notas automáticas por enquanto; ferramentas como o release-please ficam para quando a CI existir.

## Ambientes
| Ambiente | Branch | Onde | Banco | Pluggy |
|---|---|---|---|---|
| Produção | `main` (a tag da release) | PC, projeto próprio do Docker Compose | O banco do dia a dia, com [backup](backup.md) | Reconciliação agendada e webhook pelo túnel ([ADR 06](../adr/adr-06-seguranca-webhook-e-tunel.md)) |
| Homologação | `homolog` | PC, outro projeto do Docker Compose, em outras portas | **Restaurado do último backup da produção** a cada promoção | Só reconciliação manual; sem webhook nem túnel |
| Desenvolvimento | `develop` e branches de trabalho | PC e sessões na nuvem | Banco local de desenvolvimento | Ver [testes](testes.md) |

**Por que a homologação usa uma cópia da produção:** o banco do Centavo é o único arquivo do passado (a Pluggy guarda ~12 meses). Testar uma versão nova, principalmente migration ou mudança na [reconciliação](../fluxos/reconciliacao.md), direto nele é arriscado. A cópia testa migrations contra dados reais sem risco e, a cada promoção, prova que o backup restaura.

**O banco da homologação é descartável:** é recriado a cada promoção, não tem backup e nada dele volta para a produção.
