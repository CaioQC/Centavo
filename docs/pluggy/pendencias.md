# Pendências: confirmar com dados reais

A documentação da Pluggy não responde estes pontos; eles só se resolvem com dados reais dos seus bancos. Fazer antes da Fase 0 do [roadmap](../roadmap/roadmap.md), com um script avulso (seção "Como resolver", abaixo): as respostas podem simplificar as ADRs 07, 09 e 11 antes de escrever o código.

- [ ] Os itens do Meu Pluggy trazem `category` preenchida? Afeta [ADR 07](../adr/adr-07-categorizacao-em-camadas.md).
- [ ] Os itens do Meu Pluggy trazem `providerId`? Se sempre trouxerem, a impressão digital da [ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md) vira só reserva.
- [ ] Como **cada um dos seus bancos** data as parcelas e se lança todas de uma vez. Afeta [ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md).
- [ ] Os investimentos trazem o valor aplicado (custo de compra), além do saldo? Afeta o [apoio ao IR](../fluxos/imposto-de-renda.md).
- [ ] A renovação anual mantém ou troca o Item ID? Afeta a [conexão de banco](../fluxos/conexao-meu-pluggy.md). Só dá para confirmar na primeira renovação.

## Como resolver
- **Sandbox para construir:** os conectores de teste da Pluggy servem para escrever e testar o script, montar o *fake* da Pluggy, gerar fixtures sem dado pessoal e rodar a [reconciliação](../fluxos/reconciliacao.md) no desenvolvimento. Eles não respondem às pendências, que dependem do comportamento dos seus bancos reais (datas das parcelas, `providerId`, categoria no Meu Pluggy, Item ID na renovação).
- **Dados reais só para responder, por um script que imprime estatísticas, não conteúdo:** por exemplo, "transações com `providerId`: 312 de 340", "categoria preenchida: 95%", "data das parcelas do cartão X igual à da compra ou ao mês da fatura". Nenhuma descrição, valor ou nome sai do script, e essa saída pode ir para uma sessão do Claude. Quem roda o script é o Caio.
- **JSON bruto só se uma resposta pedir investigação mais funda:** salvo em `fixtures/pluggy-raw/` (fora do git) e nunca lido numa sessão do Claude ([uso de IA no desenvolvimento](../arquitetura/uso-de-ia-no-desenvolvimento.md)).

Ao resolver um item, marque-o aqui, atualize a nota afetada e registre no [registro de decisões](../decisoes/registro.md).
