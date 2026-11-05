---
tags: [adr]
status: aceita
data: 2026-11-02
---

# ADR 10: Datas e fuso horário

- **Decisão:** todo cálculo de dia e mês é feito em `America/Sao_Paulo`.
- **Regra:** timestamps da Pluggy são convertidos para a data local na borda; `transactions.date` é `DATE` local. Uma compra às 23h do dia 31 pertence ao dia 31, não ao dia 1º do mês seguinte.
