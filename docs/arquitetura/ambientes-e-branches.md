# Ambientes e branches

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
3. **Produção:** aprovado → PR `homolog` → `main`, com **merge comum, sem squash**, e uma **tag** de versão (ex.: `v0.1.0`, uma por fase do [roadmap](../roadmap/roadmap.md)).

- **A promoção é sempre para cima** e sempre por PR. Toda correção nasce na `develop` e sobe pelo mesmo caminho.
- **Sem squash nas promoções:** com squash, as três branches divergem e o PR seguinte traz commits antigos ou conflito.
- **Exceção (defeito urgente em produção):** branch a partir da `main` → PR para a `main`; depois a correção volta para a `homolog` e a `develop`.

## Ambientes
| Ambiente | Branch | Onde | Banco | Pluggy |
|---|---|---|---|---|
| Produção | `main` | PC, projeto próprio do Docker Compose | O banco do dia a dia, com [backup](seguranca-e-operacao.md) | Reconciliação agendada e webhook pelo túnel ([ADR 06](../adr/adr-06-seguranca-webhook-e-tunel.md)) |
| Homologação | `homolog` | PC, outro projeto do Docker Compose, em outras portas | **Restaurado do último backup da produção** a cada promoção | Só reconciliação manual; sem webhook nem túnel |
| Desenvolvimento | `develop` e branches de trabalho | PC e sessões na nuvem | Banco local de desenvolvimento | Ver [testes](testes.md) |

**Por que a homologação usa uma cópia da produção:** o banco do Centavo é o único arquivo do passado (a Pluggy guarda ~12 meses). Testar uma versão nova, principalmente migration ou mudança na [reconciliação](../fluxos/reconciliacao.md), direto nele é arriscado. A cópia testa migrations contra dados reais sem risco e, a cada promoção, prova que o backup restaura.

**O banco da homologação é descartável:** é recriado a cada promoção, não tem backup e nada dele volta para a produção.
