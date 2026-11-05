# Pipeline de uma transação vinda da Pluggy

Executado pela [reconciliação](reconciliacao.md) para cada transação nova ou alterada.

1. Escolher o valor (`amountInAccountCurrency` se for compra internacional, senão `amount`), converter para centavos e normalizar o sinal pelo `type` (`DEBIT` → negativo, `CREDIT` → positivo). [ADR 01](../adr/adr-01-valores-em-centavos.md)
2. Converter a data para o dia local. [ADR 10](../adr/adr-10-datas-e-fuso-horario.md)
3. Procurar a mesma operação entre as soft-deleted (`provider_id`, depois impressão digital); se achar, **transferir as anotações do usuário** e pular os passos já decididos por elas. [ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md)
4. Categorizar, se não for manual: regra que casar (maior prioridade) → mapeamento da Pluggy (ID exato, depois o pai) → "Sem categoria". [ADR 07](../adr/adr-07-categorizacao-em-camadas.md)
5. Agrupar parcelas (`installment_group_key`) e calcular `budget_month`. [ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md)
6. Tentar parear como transferência interna ou pagamento de fatura. [ADR 08](../adr/adr-08-transferencias-internas.md)
7. Associar a uma assinatura confirmada; se houver padrão recorrente novo, criar uma `subscription` `SUGGESTED`.
