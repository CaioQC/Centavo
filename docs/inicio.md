# 🪙 Centavo

Sistema de gerenciamento financeiro pessoal integrado à API da **Pluggy (Open Finance Brasil)**. Uso pessoal (um único usuário) e projeto de portfólio.

> O nome vem da regra mais importante do sistema: todo valor monetário é um número inteiro de **centavos** ([ADR 01](adr/adr-01-valores-em-centavos.md)).

**Estado atual:** especificação pronta; nenhum código ainda. Próximo passo: [Fase 0 do roadmap](roadmap/roadmap.md).

## Produto
- [Visão e objetivos](produto/visao.md)
- [Decisões de produto](produto/decisoes-de-produto.md)
- [Glossário](produto/glossario.md)

## Arquitetura
- [Monorepo e papel de cada parte](arquitetura/monorepo.md)
- [Stack tecnológica](arquitetura/stack.md)
- [Segurança e operação](arquitetura/seguranca-e-operacao.md)
- [Ambientes, branches e releases](arquitetura/ambientes-e-branches.md)
- [Backup](arquitetura/backup.md)
- [Convenções de branch, commit e PR](arquitetura/convencoes-de-git.md)
- [Estratégia de testes](arquitetura/testes.md)
- [IA local (Ollama)](arquitetura/ia-local.md)

## ADRs (decisões de arquitetura)
| ADR | Assunto |
|---|---|
| [01](adr/adr-01-valores-em-centavos.md) | Valores em centavos |
| [02](adr/adr-02-idempotencia-e-ciclo-de-vida.md) | Idempotência e ciclo de vida das transações |
| [03](adr/adr-03-reconciliacao-periodica.md) | Reconciliação periódica como fonte da verdade |
| [04](adr/adr-04-saldos-da-pluggy.md) | Saldos vêm da Pluggy (com histórico) |
| [05](adr/adr-05-offline-first-mobile.md) | Offline-first no mobile (suspensa: mobile é ideia futura) |
| [06](adr/adr-06-seguranca-webhook-e-tunel.md) | Segurança do webhook e do túnel |
| [07](adr/adr-07-categorizacao-em-camadas.md) | Categorização em camadas |
| [08](adr/adr-08-transferencias-internas.md) | Transferências internas fora dos cálculos |
| [09](adr/adr-09-anotacoes-sobrevivem-troca-de-id.md) | Anotações do usuário sobrevivem à troca de ID |
| [10](adr/adr-10-datas-e-fuso-horario.md) | Datas e fuso horário |
| [11](adr/adr-11-orcamento-cartao-parcelado.md) | Orçamento de compras no cartão |

## Domínio
- [Modelo de dados](dominio/modelo-de-dados.md)

## Fluxos
- [Conexão de banco (Meu Pluggy), renovação e reconexão](fluxos/conexao-meu-pluggy.md)
- [Reconciliação e webhook](fluxos/reconciliacao.md)
- [Pipeline de uma transação](fluxos/pipeline-de-transacao.md)
- [Projeção de fatura](fluxos/projecao-de-fatura.md)
- [Orçamento do mês](fluxos/orcamento-do-mes.md)
- [Apoio à declaração do Imposto de Renda](fluxos/imposto-de-renda.md)

## Pluggy
- [Fatos verificados na documentação](pluggy/fatos-verificados.md)
- [Pendências: confirmar com dados reais](pluggy/pendencias.md)

## Planejamento
- [Roadmap](roadmap/roadmap.md)
- [Backlog (tarefas soltas; migrando para as Issues do GitHub)](roadmap/backlog.md)
- [Registro de decisões](decisoes/registro.md)
