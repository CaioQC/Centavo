---
tags: [adr]
status: aceita
data: 2026-11-02
---

# ADR 06: Segurança do webhook e do túnel

- **Autenticação:** a Pluggy não assina webhooks com HMAC. O webhook é criado (via API) com um header secreto (ex.: `X-Centavo-Webhook-Secret`) cujo valor vem de variável de ambiente; um middleware o compara em tempo constante.
- **Origem:** aceitar apenas o IP publicado pela Pluggy na documentação de webhooks (`52.67.145.81` em 11/2026; a lista pode mudar, então ela fica em variável de ambiente).
- **Superfície:** o túnel expõe **somente** o caminho `/webhooks/pluggy` (regra de *ingress* por caminho no Cloudflare Tunnel). O dashboard e o resto da API ficam acessíveis só na rede local.
- **Respostas:** `401` para segredo inválido (a Pluggy não tenta de novo); `5XX` só para falha temporária (a Pluggy tenta de novo).

Veja também: [segurança e operação](../arquitetura/seguranca-e-operacao.md), [reconciliação e webhook](../fluxos/reconciliacao.md).
