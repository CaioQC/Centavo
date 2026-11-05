---
tags: [adr]
status: aceita
data: 2026-11-02
---

# ADR 11: Orçamento de compras no cartão

- **Decisão:** mês da compra, parcelado (ver [decisões de produto](../produto/decisoes-de-produto.md)).
- **Regra:** `transactions.budget_month` é derivado na gravação: `mês(data da compra) + (installment_number − 1)`; para compras à vista, `mês(data)`. O orçamento soma por `budget_month`, ignorando transferências internas e transações com `deleted_at`.

## Data da compra
A Pluggy informa que o `date` das parcelas **varia por banco**. No padrão mais comum, a parcela 1 traz a data da compra e as seguintes trazem a data de lançamento na fatura. Por isso:
- a data da compra de um grupo de parcelas é o `date` da **parcela 1**, quando ela está no banco;
- se a parcela 1 não estiver disponível (compra anterior ao histórico de ~12 meses, por exemplo), estima-se `mês(date da parcela k) − (k − 1)` e a transação recebe `budget_month_estimated = true`, que aparece na interface como valor aproximado.

## Casos especiais
- **Bancos que lançam todas as parcelas de uma vez:** algumas instituições enviam todas as parcelas logo após a compra, com datas futuras. Transação com data futura **não é erro**.
- **Parcelas futuras** que a Pluggy ainda não enviou entram no orçamento dos meses seguintes como **"já comprometido"**, calculado a partir da última parcela conhecida de cada grupo. Não são gravadas como transações, e uma parcela só é projetada se não existir no banco (evita contar duas vezes nos bancos que lançam tudo de uma vez).

Veja também: [orçamento do mês](../fluxos/orcamento-do-mes.md), [projeção de fatura](../fluxos/projecao-de-fatura.md), [pendências](../pluggy/pendencias.md) (como cada banco seu data as parcelas).
