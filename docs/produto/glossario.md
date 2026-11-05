# Glossário

| Termo | Significado |
|---|---|
| **Pluggy** | Agregador de Open Finance no Brasil; fornece contas, transações, faturas e investimentos dos bancos por API. |
| **Meu Pluggy** | Serviço gratuito da Pluggy para uso pessoal, onde você conecta os seus bancos (`meu.pluggy.ai`) e os autoriza para a sua aplicação. |
| **Item** | Uma conexão com uma instituição na Pluggy. Tem contas, investimentos e transações. Identificado pelo **Item ID**. |
| **Item proxy** | O item que aparece na sua aplicação espelhando a conexão feita no Meu Pluggy. Atualiza a cada 24 h e não aceita atualização manual. |
| **Consentimento** | A autorização para a aplicação ler os dados. No Meu Pluggy dura um ano (`consentExpiresAt`). |
| **Reconciliação** | Job que rebusca da Pluggy o estado de um item e acerta o banco local. É a fonte da verdade ([ADR 03](../adr/adr-03-reconciliacao-periodica.md)). |
| **Soft delete** | Marcar `deleted_at` em vez de apagar a linha; preserva as anotações do usuário ([ADR 02](../adr/adr-02-idempotencia-e-ciclo-de-vida.md)). |
| **`provider_id`** | Identificador da transação na própria instituição (só em conectores Open Finance). Sobrevive quando a Pluggy troca o ID. |
| **Impressão digital** | Chave calculada (conta, data, valor, descrição, parcela, posição no dia) para reconhecer a mesma transação sem `provider_id` ([ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md)). |
| **Anotações do usuário** | Tudo o que o usuário fez numa transação: categoria manual, marcação de transferência, vínculo com assinatura, observação. |
| **Transferência interna** | Movimento entre contas do próprio usuário (inclui pagamento de fatura); não é receita nem despesa ([ADR 08](../adr/adr-08-transferencias-internas.md)). |
| **`budget_month`** | Mês em que uma transação conta no orçamento ([ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md)). |
| **Grupo de parcelas** | As parcelas de uma mesma compra, agrupadas por heurística (`installment_group_key`). |
| **Já comprometido** | Parcelas futuras que ainda não chegaram da Pluggy, projetadas no orçamento dos meses seguintes. |
| **Centavos** | Unidade de todo valor monetário no sistema ([ADR 01](../adr/adr-01-valores-em-centavos.md)). |
