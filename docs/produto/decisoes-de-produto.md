# Decisões de produto

O porquê de cada decisão está no [registro de decisões](../decisoes/registro.md).

| Tema | Decisão |
|---|---|
| Usuários | Apenas um usuário, criado por comando (`node ace`) ou seed. Não há cadastro público. As tabelas mantêm `user_id` mesmo assim. |
| Conexão bancária | **Meu Pluggy**: gratuito, não expira com o trial, **até 5 conexões**, só uso pessoal (sem uso comercial). Os bancos são conectados em `meu.pluggy.ai`, autorizados para a aplicação pelo conector MeuPluggy no dashboard da Pluggy, e o Centavo registra cada **Item ID** (o `GET /v2/items` não funciona para itens do Meu Pluggy). O widget Pluggy Connect fica para depois do MVP. Ver [conexão de banco](../fluxos/conexao-meu-pluggy.md). |
| Atualidade dos dados | No Meu Pluggy, os itens são atualizados **uma vez a cada 24 h** e **não podem** ser atualizados manualmente. O Centavo mostra sempre "atualizado em …" e não promete tempo real. |
| Renovação anual | A autorização do Meu Pluggy para a aplicação **dura um ano** (`consentExpiresAt` no item). Renovar exige refazer o fluxo de conexão, que pode gerar **Item ID novo**. O Centavo avisa com antecedência e religa contas e transações ao novo item sem duplicar (ver "Expiração, renovação e reconexão" em [conexão de banco](../fluxos/conexao-meu-pluggy.md)). |
| Login | E-mail + senha + **2FA TOTP** (Google Authenticator etc.) com códigos de recuperação. |
| Categorias | A categoria enviada pela Pluggy é mapeada para uma lista própria e enxuta. O usuário pode recategorizar manualmente e criar regras (ex.: descrição contém `IFOOD` → Alimentação). Ver [ADR 07](../adr/adr-07-categorizacao-em-camadas.md). |
| Orçamento | Definido **por mês** e ajustável. Ao abrir um mês novo, os limites do mês anterior são copiados. |
| Cartão no orçamento | **Mês da compra, parcelado.** Compra à vista conta no mês da compra; numa compra em N vezes, a parcela *k* conta no mês da compra + (*k* − 1). Estornos abatem o gasto da categoria. Ver [ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md). |
| Metas | Cada meta pode ser **vinculada a uma conta ou a um investimento** (o saldo é o progresso) **ou** receber **aportes manuais**. |
| Projeção de fatura | Considera **parcelas futuras**, **assinaturas recorrentes** (sugeridas pelo sistema e confirmadas pelo usuário) e a **estimativa pelo ritmo de gasto** da fatura aberta. Ver [projeção de fatura](../fluxos/projecao-de-fatura.md). |
| Lançamentos manuais | Suportados: contas manuais (dinheiro em espécie, contas fora do Open Finance) e transações sem ID da Pluggy. |
| Transferências internas | Transferências entre as próprias contas e pagamentos de fatura são **detectados automaticamente** e excluídos de orçamento e relatórios, para o gasto não contar duas vezes. A marcação pode ser corrigida manualmente. Ver [ADR 08](../adr/adr-08-transferencias-internas.md). |
| Hospedagem (MVP) | Local, com Docker Compose (PostgreSQL + Redis). Um túnel (Cloudflare Tunnel ou ngrok) expõe **apenas** a rota do webhook. O deploy é decidido depois. Ver [ADR 06](../adr/adr-06-seguranca-webhook-e-tunel.md). |
| Escopo | **Backend + Web.** Um app mobile é ideia futura, fora do roadmap. |
