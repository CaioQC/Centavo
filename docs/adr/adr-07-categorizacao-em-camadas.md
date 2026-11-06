---
tags: [adr]
status: aceita
data: 2026-11-02
---

# ADR 07: Categorização em camadas

- **Decisão:** a categoria final de uma transação segue esta precedência: **manual > regra > mapeamento da Pluggy**.
- **Regra:** `transactions.category_source` registra a origem (`MANUAL`, `RULE`, `PLUGGY_MAP`). Uma reconciliação ou uma regra nova **nunca** sobrescreve uma categoria manual, inclusive quando a Pluggy recria a transação ([ADR 09](adr-09-anotacoes-sobrevivem-troca-de-id.md)).
- **Categorias da Pluggy:** são hierárquicas (`GET /categories`; ex.: `01000000` "Renda" → `01010000` "Salário", com `parentId`). O mapeamento procura o ID exato e, se não houver, o do pai.
- **A categoria da Pluggy pode vir vazia:** a documentação diz que a categorização depende do nível de assinatura da aplicação. Se os itens do Meu Pluggy vierem sem categoria, o sistema funciona só com regras e recategorização manual. A categoria da Pluggy é um bônus, não um requisito ([pendências](../pluggy/pendencias.md)).
- **Sugestões da IA local não são uma camada:** ficam pendentes na lista "revisar" e só viram categoria quando o usuário aceita, como `MANUAL` ([IA local](../arquitetura/ia-local.md)).
