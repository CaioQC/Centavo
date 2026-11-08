# Apoio à declaração do Imposto de Renda

Ajuda a preparar e conferir a declaração anual do IRPF. Entra na Fase 7 (pós-MVP) do [roadmap](../roadmap/roadmap.md); o porquê está no [registro de decisões](../decisoes/registro.md).

**O Centavo não calcula imposto nem restituição.** Esses valores saem do informe de rendimentos do empregador (salário bruto, IR retido, INSS), que o Centavo não vê: ele só enxerga o salário líquido que entra na conta. A fonte principal é a declaração pré-preenchida da Receita; o Centavo serve para **conferir e organizar**.

Nada precisa ser construído antes da Fase 7: saldos ([ADR 04](../adr/adr-04-saldos-da-pluggy.md)) e categorias ([ADR 07](../adr/adr-07-categorizacao-em-camadas.md)) já são gravados desde as fases 2 e 3, então o relatório lê o ano inteiro para trás.

## Partes, por prioridade
1. **Saldos em 31/12** de cada conta e investimento, para conferir os saldos que os bancos mandam para a pré-preenchida.
   - Vem de `balance_snapshots`: o registro mais recente com data até 31/12 (dia em `America/Sao_Paulo`, [ADR 10](../adr/adr-10-datas-e-fuso-horario.md)). O Meu Pluggy atualiza a cada 24 h e o PC pode estar desligado na virada do ano, então a tela mostra a data do registro usado.
   - **Investimentos:** a declaração pede o valor de compra (custo), não o saldo atual. O Centavo mostra o saldo como referência; o custo vem do informe da instituição, a não ser que a Pluggy o forneça ([pendências](../pluggy/pendencias.md)).
2. **Despesas dedutíveis do ano:** totais das categorias dedutíveis (Saúde, Educação), com a lista de transações, para conferir a pré-preenchida e comparar a declaração simplificada com a completa. A [IA local](../arquitetura/ia-local.md) pode sugerir transações que parecem dedutíveis, sempre como sugestão. Como marcar uma categoria como dedutível fica para o detalhamento da Fase 7.
3. **Checklist anual** (menor prioridade): em março, um lembrete com a lista de informes de rendimentos para buscar em cada instituição conectada.

Transferências internas ficam fora dos totais, como em todo relatório ([ADR 08](../adr/adr-08-transferencias-internas.md)).
