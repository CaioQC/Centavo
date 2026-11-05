# Fatos verificados na documentação da Pluggy

Verificado em 02/11/2026. Se algo na documentação mudar, atualize aqui e nas notas afetadas.

| Pergunta | Resposta | Onde afeta |
|---|---|---|
| `date` das parcelas | Varia por banco; no padrão comum, parcela 1 = data da compra e as demais = data de lançamento na fatura. Alguns bancos lançam todas as parcelas de uma vez. | [ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md) |
| Recriação de transações | Acontece quando data, descrição ou valor mudam demais (comum no fechamento da fatura). Nada liga a antiga à nova; o `providerId` (só Open Finance) é estável. | [ADR 02](../adr/adr-02-idempotencia-e-ciclo-de-vida.md), [ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md) |
| `PENDING` → `POSTED` | Normalmente mantém o ID (`transactions/updated`). | [ADR 02](../adr/adr-02-idempotencia-e-ciclo-de-vida.md) |
| Entrega de webhooks | Só 3 tentativas (imediata, ~15 min, ~2 h), depois o evento é perdido. Itens do Meu Pluggy enviam webhooks como qualquer item. | [ADR 03](../adr/adr-03-reconciliacao-periodica.md) |
| Autenticação de webhook | Sem HMAC; headers customizados (definidos via API) e IP de origem `52.67.145.81`. | [ADR 06](../adr/adr-06-seguranca-webhook-e-tunel.md) |
| Meu Pluggy | Gratuito, até 5 conexões, uso pessoal, não expira com o trial; atualiza a cada 24 h; não aceita atualização manual; `GET /v2/items` indisponível. | [Decisões de produto](../produto/decisoes-de-produto.md) |
| Reconexão e consentimento | Reconectar gera item e IDs novos; a autorização do Meu Pluggy dura 1 ano (`consentExpiresAt`); expirada → `USER_AUTHORIZATION_EXPIRED`, `LOGIN_ERROR`, `item/error`. | [Conexão de banco](../fluxos/conexao-meu-pluggy.md) |
| Moeda estrangeira | `currencyCode` + `amountInAccountCurrency`. | [Modelo de dados](../dominio/modelo-de-dados.md) |
| Sinal no cartão | Compras positivas, pagamento da fatura negativo. | [Modelo de dados](../dominio/modelo-de-dados.md) |
| Investimentos | Endpoint próprio (`GET /investments`); não são contas. | [Modelo de dados](../dominio/modelo-de-dados.md) |
| Status do item | `UPDATING`, `UPDATED`, `OUTDATED`, `LOGIN_ERROR`, `WAITING_USER_INPUT`. | [Modelo de dados](../dominio/modelo-de-dados.md) |
| Categorias | Hierárquicas (`GET /categories`); dependem do nível de assinatura. | [ADR 07](../adr/adr-07-categorizacao-em-camadas.md) |
| Histórico | Até ~12 meses de transações. | [ADR 04](../adr/adr-04-saldos-da-pluggy.md), [segurança e operação](../arquitetura/seguranca-e-operacao.md) |
| Rate limit | 360 req/min por endpoint e por IP nos `GET` e no `POST /auth`; API key reutilizável por ~2 h. | [ADR 03](../adr/adr-03-reconciliacao-periodica.md) |
| Cliente tipado | Tuyau, oficial no AdonisJS 7. | [Monorepo](../arquitetura/monorepo.md) |

## Fontes
- [Webhooks](https://docs.pluggy.ai/en/docs/developer-tools/webhooks-ref.md)
- [Ciclo da fatura do cartão](https://docs.pluggy.ai/en/docs/products/credit-card-statement-cycle.md)
- [Parcelas de cartão](https://docs.pluggy.ai/en/docs/products/credit-card-installments.md)
- [Transações](https://docs.pluggy.ai/en/docs/products/transactions.md)
- [Meu Pluggy para uso pessoal](https://docs.pluggy.ai/en/docs/guides/meu-pluggy-personal-use.md)
- [Item](https://docs.pluggy.ai/pt/docs/connections/item)
- [Ciclo de vida do item](https://docs.pluggy.ai/en/docs/connections/item-lifecycle.md)
- [Consentimentos](https://docs.pluggy.ai/en/docs/connections/consents.md)
- [Categorias](https://docs.pluggy.ai/en/reference/category/categories-list)
- [Rate limits](https://docs.pluggy.ai/en/docs/reference/rate-limits.md)
- [Tuyau (AdonisJS)](https://docs.adonisjs.com/guides/frontend/api-client)
