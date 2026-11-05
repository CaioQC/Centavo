# Reconciliação e webhook

Regras e motivos em [ADR 03](../adr/adr-03-reconciliacao-periodica.md) e [ADR 06](../adr/adr-06-seguranca-webhook-e-tunel.md).

## Reconciliação (fonte da verdade)
```text
[Agendador BullMQ] ─┐
[Webhook Pluggy]  ──┼──> (Job "reconcile:item:{id}", um por item)
[Botão Sincronizar]─┘                 │
                          [Worker] GET /items/{id} → status, consentimento
                                      │
                    Contas, investimentos, faturas → upsert + snapshot de saldo
                                      │
          Transações desde last_synced_at − janela → upsert / soft delete das que sumiram
                                      │
   Pipeline de transação → transferências pendentes de par → registra sync_run
```

O tratamento de cada transação está em [pipeline de transação](pipeline-de-transacao.md). Se o item não estiver em `SUCCESS`/`PARTIAL_SUCCESS`, nenhuma transação recebe soft delete ([conexão de banco](conexao-meu-pluggy.md)).

## Recepção de webhook
```text
[Pluggy] ──(POST /webhooks/pluggy, via túnel restrito ao caminho)──> [Middleware: IP + header secreto]
                                                                            │
                                                         (Enfileira reconciliação do item)
                                                                            │
                                                              [Responde 2XX em < 10 s]
```
