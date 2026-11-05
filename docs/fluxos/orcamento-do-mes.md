# Orçamento do mês

Para cada categoria do mês *M*:

- **Gasto** = soma de `amount_in_cents` das transações com `budget_month = M`, sem `deleted_at` e sem `is_internal_transfer`.
- **Já comprometido** (exibido à parte) = parcelas futuras projetadas que caem em *M* ([ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md)).
- **Limite** = `budgets.limit_in_cents` de *M*. Ao abrir um mês novo, os limites do mês anterior são copiados ([decisões de produto](../produto/decisoes-de-produto.md)).

Estornos (valores positivos numa categoria de despesa) abatem o gasto. Transações com `budget_month_estimated = true` aparecem como valor aproximado.
