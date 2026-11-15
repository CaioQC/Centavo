# Ambientes, branches e releases

Como o código sai da máquina de desenvolvimento e chega ao Centavo do dia a dia. O porquê está no [registro de decisões](../decisoes/registro.md).

## Branches
| Branch | Papel |
|---|---|
| `main` | Produção: a versão que roda o Centavo do dia a dia. Só recebe PR. |
| `develop` | Integração e **branch padrão** do GitHub. As sessões do Claude Code na nuvem partem dela. Só recebe PR. |
| branches de trabalho | Criadas a partir da `develop`, uma por entrega. Nas sessões na nuvem, é a branch da sessão. |

## Fluxo
1. **Trabalho:** branch a partir da `develop` → PR para a `develop`, com **squash** (um commit limpo por entrega).
2. **Release:** etapa pronta → PR `develop` → `main`, com **merge comum, sem squash** → tag e release no commit da `main` (seção "Releases", abaixo).

- **Sem squash na release nem na volta da `main`:** com squash, as branches divergem e o PR seguinte traz commits antigos ou conflito.

## Correções
- **Bug achado no desenvolvimento:** corrigido na `develop` e sobe na release seguinte.
- **Bug na produção com trabalho inacabado na `develop`:** branch `fix/` a partir da `main` → PR para a `main` (pode ser com squash) → release de correção (ex.: `v0.4.0` → `v0.4.1`) → **logo em seguida**, PR `main` → `develop`, com merge comum. Sem essa volta, a `develop` fica sem a correção e a release seguinte reintroduz o bug.
- **A volta é merge, nunca reset da `develop`:** a etapa seguinte pode já estar sendo desenvolvida nela, e um reset apagaria esse trabalho.

## Releases
- **Onde nasce:** no commit da `main` depois do merge, porque é ele que roda na produção.
- **Quando:** a cada release e a cada correção na `main`. A fase do [roadmap](../roadmap/roadmap.md) aparece nas notas, não no número.
- **Numeração (SemVer):** `0.x.y` até o MVP ficar pronto (fim da Fase 6) e `1.0.0` nele. Release sobe o número do meio (`0.3.0` → `0.4.0`); correção sobe o último (`0.4.0` → `0.4.1`).
- **Notas:** geradas pelo GitHub ("Generate release notes"). Sem `CHANGELOG.md`: duplicaria as releases.
- **A produção roda a tag, não a ponta da `main`:** sempre se sabe qual versão está rodando.
- **Atualizar a produção:** [backup](backup.md) logo antes → ensaio de release, quando couber (abaixo) → trocar para a tag nova. **Voltar atrás:** tag anterior + restaurar esse backup (a tag anterior sozinha não desfaz uma migration).

## Ensaio de release
O banco do Centavo é o único arquivo do passado (a Pluggy guarda ~12 meses), e migration errada nele é irreversível. Por isso, toda release com migration, ou que mexe na [reconciliação](../fluxos/reconciliacao.md) ou nas anotações do usuário, é ensaiada antes:
1. Restaurar o último backup da produção num banco descartável.
2. Subir a versão nova contra ele: migrations e uma reconciliação manual.
3. Conferir os dados e apagar o banco.

O ensaio também prova que o backup restaura. Começa com a primeira release em produção, no fim da Fase 2 ([roadmap](../roadmap/roadmap.md)).

## Ambientes
| Ambiente | Versão | Onde | Banco | Pluggy |
|---|---|---|---|---|
| Produção | A tag da release, na `main` | PC, projeto próprio do Docker Compose | O banco do dia a dia, com [backup](backup.md) | Reconciliação agendada e webhook pelo túnel ([ADR 06](../adr/adr-06-seguranca-webhook-e-tunel.md)) |
| Desenvolvimento | `develop` e branches de trabalho | PC e sessões na nuvem | Banco local de desenvolvimento | Ver [testes](testes.md) |

O banco do ensaio de release não é um ambiente fixo: nasce do backup, serve a um ensaio e é apagado.
