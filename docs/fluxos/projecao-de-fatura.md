# Projeção de fatura (calculada, nunca persistida)

Para cada cartão, a fatura de um mês futuro é a soma de:
- **Parcelas futuras:** para cada `installment_group_key`, as parcelas de (última conhecida + 1) até `total_installments`, só as que ainda não existem no banco ([ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md));
- **Assinaturas confirmadas** daquele cartão;
- Para a fatura **aberta**: o já lançado + (média diária de gasto do ciclo × dias até o fechamento).

Quando a parcela real chega da Pluggy, ela substitui naturalmente a projetada, porque a projeção é recalculada a cada consulta.

Transferências internas (inclusive o pagamento da fatura) ficam fora da projeção ([ADR 08](../adr/adr-08-transferencias-internas.md)).
