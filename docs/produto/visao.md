# Visão e objetivos

## Objetivo do projeto
Desenvolver um sistema de gestão financeira pessoal (Backend e Web) alimentado via Open Finance. O sistema centraliza saldos, extratos, cartões de crédito, faturas e investimentos de múltiplas instituições financeiras e, sobre esses dados, oferece três funcionalidades centrais:

1. **Orçamento mensal por categoria** ([como é calculado](../fluxos/orcamento-do-mes.md))
2. **Projeção de faturas do cartão de crédito** ([como é calculada](../fluxos/projecao-de-fatura.md))
3. **Metas de economia**

## Metas de engenharia
- **Uso pessoal:** um único usuário (o dono do projeto). Execução robusta e segura, acessível via dashboard web. Um app mobile é ideia futura, fora do roadmap.
- **Portfólio profissional:** demonstrar maturidade de arquitetura em nível Pleno/Sênior (monorepo, separação de responsabilidades, idempotência, reconciliação de dados externos, filas, 2FA e type-safety ponta a ponta).
- **Sem prazo fixo:** a prioridade é qualidade e aprendizado, não velocidade.

Veja também: [Decisões de produto](decisoes-de-produto.md).
