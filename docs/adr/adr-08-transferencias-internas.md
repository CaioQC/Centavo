---
tags: [adr]
status: aceita
data: 2026-11-02
---

# ADR 08: Transferências internas fora dos cálculos

- **Decisão:** movimentações entre as próprias contas não são receita nem despesa.
- **Regra:** a detecção procura pares (mesmo valor saindo de uma conta e entrando em outra do usuário numa janela de poucos dias) e pagamentos de fatura de cartão. As transações marcadas (`is_internal_transfer = true`, ligadas por `transfer_pair_id`) ficam fora de orçamento, relatórios e projeções.
- **Reexecução:** como as duas pontas podem chegar em reconciliações diferentes, a detecção roda de novo sobre as transações ainda sem par dos últimos dias a cada reconciliação.
- **Correção manual:** o usuário pode desfazer ou criar a marcação; marcação manual (`transfer_source = MANUAL`) não é desfeita automaticamente.
