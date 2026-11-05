---
tags: [adr]
status: aceita
data: 2026-11-02
---

# ADR 03: Reconciliação periódica como fonte da verdade

- **Decisão:** os dados são mantidos corretos por um **job agendado de reconciliação**; o webhook apenas antecipa esse trabalho.
- **Motivo:** a Pluggy tenta entregar cada webhook só 3 vezes (imediatamente, depois de ~15 min e depois de ~2 h) e então desiste. Com a API rodando num PC local, eventos serão perdidos. Os itens do Meu Pluggy enviam webhooks como qualquer item, mas só mudam uma vez por dia e não aceitam atualização manual.

## Regra
- Um job repetível do BullMQ (ex.: a cada 6 h e na subida da API) busca, para cada item, o status, as contas, os investimentos, as faturas e as transações desde `last_synced_at` **menos uma janela de segurança** (ex.: 7 dias, pois a Pluggy refaz dados de até 4 dias antes da última coleta).
- O webhook (`POST /webhooks/pluggy`) valida, enfileira um job de reconciliação daquele item e responde `2XX` em menos de 10 s ([ADR 06](adr-06-seguranca-webhook-e-tunel.md)).
- O botão "sincronizar" do dashboard enfileira o mesmo job. Ele rebusca da Pluggy, mas **não** força o banco a atualizar.
- Cada execução grava um registro em `sync_runs` (origem, início, fim, resultado, contagens).
- Um mesmo item nunca tem dois jobs de reconciliação rodando ao mesmo tempo (`jobId` por item no BullMQ).
- A listagem de transações percorre todas as páginas com o endpoint por cursor (`transactions-list-by-cursor`); a listagem por página está *deprecated*.
- **Rate limit** não é problema nesse volume (360 req/min por endpoint e por IP nos `GET` e no `POST /auth`). A API key da Pluggy é cacheada e reutilizada por ~2 h em vez de autenticar a cada chamada. Em `429`, esperar o tempo do header `RateLimit-Reset`.

O passo a passo está em [reconciliação e webhook](../fluxos/reconciliacao.md).
