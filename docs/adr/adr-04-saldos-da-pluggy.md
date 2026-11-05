---
tags: [adr]
status: aceita
data: 2026-11-02
---

# ADR 04: Saldos vêm da Pluggy (com histórico)

- **Decisão:** o saldo das contas sincronizadas é o informado pelo banco (`account.balance` da Pluggy), **não** a soma das transações. A Pluggy devolve no máximo ~12 meses de histórico e transações pendentes, então somar divergiria do saldo real.
- **Regra:** a cada reconciliação, o saldo de contas e investimentos é atualizado e gravado em `balance_snapshots` (um registro por conta/investimento por dia), o que alimenta o gráfico de patrimônio.
- **Patrimônio** = contas bancárias + contas manuais + investimentos − saldo devedor dos cartões.
- **Contas manuais:** o saldo é atualizado atomicamente (na mesma transação de banco) a cada lançamento criado, editado ou excluído.

Substitui a ADR 04 do plano original ("saldo denormalizado a partir das transações"); o motivo está no [registro de decisões](../decisoes/registro.md).
