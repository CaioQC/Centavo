# Estratégia de testes

- **`@centavo/core` (Vitest):** conversão de centavos, `budget_month` de parcelas, virada de mês no fuso local, impressão digital, detecção de transferências e assinaturas, projeção de fatura.
- **`apps/api` (Japa):** testes de integração com PostgreSQL real (Docker) e a Pluggy substituída por um *fake* alimentado com **fixtures gravadas dos seus próprios itens** (JSON bruto, com dados pessoais anonimizados) e do sandbox da Pluggy. O JSON bruto, antes de anonimizar, fica fora do git. O Ollama também é substituído por um *fake* ([IA local](ia-local.md)).
- **CI:** lint, typecheck e testes em todo push.

## Cenários obrigatórios
- reentrega do mesmo webhook não duplica nada ([ADR 02](../adr/adr-02-idempotencia-e-ciclo-de-vida.md));
- transação de cartão apagada e recriada com novo ID mantém a categoria manual, com e sem `provider_id` ([ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md));
- transação que some da Pluggy recebe soft delete, e volta restaurada se reaparecer com o mesmo ID;
- item com consentimento expirado (leituras vazias) não gera nenhum soft delete ([conexão de banco](../fluxos/conexao-meu-pluggy.md));
- reconexão com Item ID novo não duplica contas nem transações;
- compra no cartão (valor positivo na Pluggy) vira despesa negativa; pagamento da fatura vira transferência interna ([ADR 08](../adr/adr-08-transferencias-internas.md));
- compra internacional usa o valor convertido para BRL;
- compra às 23h30 do último dia do mês cai no mês certo ([ADR 10](../adr/adr-10-datas-e-fuso-horario.md));
- compra em 10x distribui o orçamento em 10 meses, tanto em banco que lança parcela a parcela quanto em banco que lança tudo de uma vez ([ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md));
- webhook com segredo errado recebe `401` ([ADR 06](../adr/adr-06-seguranca-webhook-e-tunel.md)).
