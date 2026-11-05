# Pendências: confirmar com dados reais

A documentação da Pluggy não responde estes pontos; eles só se resolvem olhando o JSON real dos seus bancos. Fazer no início da Fase 2 do [roadmap](../roadmap/roadmap.md).

- [ ] Os itens do Meu Pluggy trazem `category` preenchida? Afeta [ADR 07](../adr/adr-07-categorizacao-em-camadas.md).
- [ ] Os itens do Meu Pluggy trazem `providerId`? Se sempre trouxerem, a impressão digital da [ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md) vira só reserva.
- [ ] Como **cada um dos seus bancos** data as parcelas e se lança todas de uma vez. Afeta [ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md).
- [ ] A renovação anual mantém ou troca o Item ID? Afeta a [conexão de banco](../fluxos/conexao-meu-pluggy.md). Só dá para confirmar na primeira renovação.

**Como:** um script baixa o JSON bruto de contas, transações e faturas de cada item. O bruto fica fora do git (tem dados reais); uma versão anonimizada vira fixture dos [testes](../arquitetura/testes.md).

Ao resolver um item, marque-o aqui, atualize a nota afetada e registre no [registro de decisões](../decisoes/registro.md).
