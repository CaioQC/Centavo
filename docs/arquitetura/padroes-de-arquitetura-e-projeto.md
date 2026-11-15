# Padrões de arquitetura e de projeto

Os padrões que o Centavo usa, onde aparecem e por quê, e os que ficam de fora. A maioria já decorre de decisões tomadas nas ADRs e nas notas de arquitetura; esta nota dá nome a eles. O porquê das escolhas novas está no [registro de decisões](../decisoes/registro.md).

## Arquitetura
| Padrão | Onde aparece | Por quê |
|---|---|---|
| **Monólito modular** | Uma API, um web e o `@centavo/core` num monorepo ([monorepo](monorepo.md)) | Um usuário e um desenvolvedor: microsserviços só trariam rede, deploy e falhas a mais |
| **Camadas (MVC)** | AdonisJS: controller recebe e valida, service tem a regra, model persiste | Separa HTTP, regra de negócio e banco; é o estilo do AdonisJS 7 |
| **Portas e adaptadores (hexagonal), parcial** | O `@centavo/core` é puro, sem banco, rede nem segredos; Pluggy e Ollama ficam nas bordas da `api` | A regra mais delicada (centavos, datas, parcelas, impressão digital) fica testável sem infraestrutura e roda igual no web |
| **Camada anticorrupção** (DDD) | O adaptador da Pluggy converte decimais, sinal e datas antes de qualquer dado entrar no domínio ([ADR 01](../adr/adr-01-valores-em-centavos.md)) | O formato da Pluggy muda e tem armadilhas; elas ficam presas num lugar só |
| **Processamento assíncrono com fila** | BullMQ: o webhook só enfileira; o job faz a [reconciliação](../fluxos/reconciliacao.md) ([ADR 03](../adr/adr-03-reconciliacao-periodica.md)) | Resposta rápida ao webhook e retentativa automática quando algo falha |
| **Consumidor idempotente** | Upsert por ID externo, soft delete e restauração ([ADR 02](../adr/adr-02-idempotencia-e-ciclo-de-vida.md)) | Webhook reentregue e job repetido não podem duplicar nem apagar dados |

## Padrões de projeto
**Já em uso ou previstos:**
| Padrão | No Centavo |
|---|---|
| **Injeção de dependência** | O contêiner do AdonisJS cria os services e entrega as dependências (regra 12 do `CLAUDE.md`) |
| **Singleton, pelo contêiner** | Um cliente da Pluggy e uma conexão com o Redis por processo, registrados no contêiner. Nunca escrito à mão |
| **Adapter** | O adaptador da Pluggy, que traduz a resposta dela para os tipos do domínio |
| **Active Record** | Os models do Lucid, que salvam e carregam a si mesmos |
| **DTO** | Os tipos de entrada e saída da API, definidos no `@centavo/core` e usados pelo web via Tuyau |
| **Value Object** | O tipo `Cents` com *brand* ([backlog](../roadmap/backlog.md)), que não se mistura com um número qualquer |
| **Factory** | As *factories* do Lucid para gerar dados de teste |
| **Test double** | O *fake* da Pluggy e do Ollama nos testes ([testes](testes.md)) |

Outros padrões (ex.: uma estratégia por banco no tratamento de parcelas da [ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md)) se decidem quando o código pedir, depois das [pendências](../pluggy/pendencias.md).

## Fora do Centavo
- **Singleton escrito à mão:** estado global, difícil de substituir nos testes. O contêiner faz o mesmo papel.
- **Repository sobre o Lucid:** o Active Record já cumpre o papel; uma camada a mais só repetiria os métodos.
- **Microsserviços, CQRS e event sourcing:** complexidade sem ganho para um sistema de um usuário. O histórico de que o Centavo precisa já está nas transações e nos *snapshots* de saldo ([ADR 04](../adr/adr-04-saldos-da-pluggy.md)).
