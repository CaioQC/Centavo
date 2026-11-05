---
tags: [adr]
status: aceita
data: 2026-11-02
---

# ADR 09: Anotações do usuário sobrevivem à troca de ID

- **Problema:** quando a Pluggy recria uma transação com novo ID ([ADR 02](adr-02-idempotencia-e-ciclo-de-vida.md)), tudo o que o usuário fez na antiga (categoria manual, marcação de transferência, vínculo com assinatura, observação) se perderia.
- **Regra:** ao inserir uma transação nova da Pluggy, procura-se uma transação **soft-deleted** na mesma conta (ou na conta religada após reconexão, ver [conexão de banco](../fluxos/conexao-meu-pluggy.md)) que represente a mesma operação, nesta ordem:
  1. **`provider_id` igual** (conectores Open Finance): correspondência certa.
  2. **Impressão digital igual**, calculada em `@centavo/core`: conta + data + valor em centavos + descrição normalizada + número da parcela + **posição entre transações idênticas do mesmo dia** (o mesmo critério que a Pluggy usa internamente).
- Havendo correspondência, as anotações do usuário são copiadas e a antiga recebe `replaced_by_id`.
- Se houver ambiguidade (duas compras idênticas no mesmo dia, sem `provider_id`), as anotações só são copiadas quando forem iguais em todas as candidatas; caso contrário, a transação nova fica sem anotação e aparece numa lista "revisar".
- Como parcelas podem ser **re-datadas** no fechamento da fatura, a busca pela impressão digital tolera diferença de data dentro do ciclo da fatura quando a transação é parcela.
- Se os seus bancos sempre mandarem `provider_id` ([pendências](../pluggy/pendencias.md)), a impressão digital vira só reserva.
