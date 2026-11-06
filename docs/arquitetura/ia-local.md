# IA local (Ollama)

Uma IA rodando no próprio PC (Ollama + modelo Qwen) sugere categorias e regras, responde perguntas sobre os gastos e resume o mês. Entra na [Fase 3](../roadmap/roadmap.md); o resumo do mês, na Fase 4, junto com o orçamento. O porquê está no [registro de decisões](../decisoes/registro.md).

## Regras
- **Só local:** dado bancário real nunca vai para IA na nuvem, nem como alternativa quando o Ollama estiver fora do ar.
- **Sugere, não decide:** sugestão de categoria não é uma camada da [ADR 07](../adr/adr-07-categorizacao-em-camadas.md). Ela fica pendente na lista "revisar" e só vira categoria quando o usuário aceita (`category_source = MANUAL`). Uma anotação do usuário nunca é tocada ([ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md)).
- **Não faz conta:** valores, totais e projeções vêm das consultas da API ([ADR 01](../adr/adr-01-valores-em-centavos.md)). O modelo escolhe a consulta ou narra o resultado, nunca calcula.
- **Não entra em chave:** a impressão digital ([ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md)) e o `installment_group_key` ([ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md)) continuam determinísticos; a resposta de um modelo muda de uma execução para outra.
- **Opcional e assíncrona:** as chamadas ao Ollama rodam em jobs próprios do BullMQ. A [reconciliação](../fluxos/reconciliacao.md) não espera por elas; com o Ollama desligado (ou a GPU ocupada), o sistema funciona igual, só sem sugestões.
- **Onde mora:** o cliente do Ollama fica só em `apps/api`. O `@centavo/core` pode ter os tipos das sugestões, nada mais ([monorepo](monorepo.md)).

## Usos
1. **Sugestão de categoria** para transações que ficaram "Sem categoria" no [pipeline](../fluxos/pipeline-de-transacao.md). O modelo recebe descrição, valor, conta, a lista de categorias e exemplos já categorizados à mão, e responde em JSON estruturado. Resposta fora da lista de categorias é descartada.
2. **Sugestão de regra:** depois de várias recategorizações manuais parecidas, propõe uma regra (ex.: descrição contém `UBER *TRIP` → Transporte). Se o usuário aceita, vira uma regra comum, determinística.
3. **Perguntas em linguagem natural** ("quanto gastei com delivery em outubro?"): *tool calling* sobre consultas prontas da API, nunca SQL livre. Assim as regras de negócio valem também aqui, como transferências internas fora da conta ([ADR 08](../adr/adr-08-transferencias-internas.md)).
4. **Resumo do mês** em texto, narrando números já calculados: gastos por categoria e situação do [orçamento](../fluxos/orcamento-do-mes.md). Fica para a Fase 4.

## Modelo e hardware
- PC com **RX 9060 XT 16 GB**. Começar por um modelo de 8–9B (ex.: Qwen 3.5 9B), que cabe com folga; os de ~27B em Q4 ficam no limite dos 16 GB.
- No Windows, o suporte do Ollama a placas RDNA 4 via ROCm é incerto; o caminho indicado é o backend **Vulkan**. A confirmar no PC ([backlog](../roadmap/backlog.md)). Fontes: [docs de GPU do Ollama](https://docs.ollama.com/gpu.md), [Phoronix sobre o Vulkan no Ollama](https://www.phoronix.com/news/ollama-Experimental-Vulkan).
- Endereço e nome do modelo vêm do `.env` da API, para trocar de modelo sem mudar código.

## Testes
- Os testes automatizados usam um *fake* do cliente do Ollama, com respostas fixas: a CI não depende de GPU ([testes](testes.md)).
- A qualidade é medida à parte: um conjunto de transações anonimizadas com a categoria certa dá a taxa de acerto do modelo. Esse número é o que permite reavaliar se a IA pode aplicar categoria sozinha.
