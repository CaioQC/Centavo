---
tags: [adr]
status: aceita
data: 2026-11-02
---

# ADR 02: Idempotência e ciclo de vida das transações

- **Decisão:** prevenir duplicação causada por reentregas de webhook, ressincronizações e recriação de transações pela Pluggy.
- **Regra:** índice único em `pluggy_transaction_id` (nulável, para lançamentos manuais). O ID da Pluggy é chave de *idempotência*, **não** identidade permanente da transação.

## Implementação
- Transação nova ou alterada: *upsert* (`updateOrCreate` no Lucid).
- Depois de qualquer evento de transação, rebuscar o estado da conta com `GET /transactions` (recomendação da Pluggy) em vez de reconstruir a partir dos eventos.
- `transactions/deleted` ou transação que sumiu na reconciliação: **soft delete** (`deleted_at`), nunca exclusão física, para preservar as anotações do usuário ([ADR 09](adr-09-anotacoes-sobrevivem-troca-de-id.md)).
- Exclusão não é definitiva: se uma transação soft-deleted voltar com o mesmo ID, ela é restaurada (`deleted_at = null`).
- Item sem sucesso não apaga nada: resposta vazia de item com consentimento expirado ou em erro nunca gera soft delete ([conexão de banco](../fluxos/conexao-meu-pluggy.md)).

## Fatos da Pluggy
- `PENDING` → `POSTED` normalmente chega como `transactions/updated` **mantendo o ID**.
- Quando data, descrição ou valor mudam demais (comum em **cartão, perto do fechamento da fatura**, quando parcelas são re-datadas), a Pluggy apaga a transação e cria outra com **ID novo**, e nada liga a antiga à nova.
- Reconectar uma conta cria um **item novo com IDs novos** para tudo.
- Em conectores Open Finance existe o `providerId`, identificador da própria instituição, que **sobrevive** a essas trocas. Ele é a primeira opção para reconhecer a mesma transação ([ADR 09](adr-09-anotacoes-sobrevivem-troca-de-id.md)).

Fontes: [fatos verificados](../pluggy/fatos-verificados.md).
