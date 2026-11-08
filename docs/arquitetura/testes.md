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

## Teste por funcionalidade
- Cada fase tem um `roadmap/fase-N.md` com as histórias e os **critérios de aceite** no formato Dado / Quando / Então. A Issue de cada funcionalidade aponta para os critérios dela nessa nota.
- Cada critério vira pelo menos um teste automatizado, e a fase só termina com todos passando.
- Os cenários obrigatórios acima são o ponto de partida para as partes mais arriscadas.

## Teste de regressão
Todo bug corrigido ganha um teste que impede que ele volte numa release futura.
1. **O teste vem antes da correção e precisa falhar sem ela.** Primeiro o teste que reproduz o bug, visto falhando; depois a correção, com o teste passando. Isso prova que o teste pega o bug.
2. **Teste e correção vão no mesmo PR,** em `fix/` e em `hotfix/`. No hotfix, a volta da `main` para a `develop` leva o teste junto ([ambientes, branches e releases](ambientes-e-branches.md)).
3. **Na camada mais baixa que reproduz o bug:** regra pura no `core` (Vitest); banco ou reconciliação na `api` (Japa); ponta a ponta só quando não houver outro jeito, porque é o mais lento e o mais frágil.
4. **O teste cita a Issue,** por exemplo `it('não duplica parcela recriada (#42)')`.
5. **Bug causado por dado real da Pluggy:** o caso anonimizado entra nas fixtures, e o *fake* da Pluggy passa a reproduzi-lo.
6. **Exceção:** se o bug não puder ser testado automaticamente (ex.: problema só visual), o PR explica por quê.

## Em aberto
Propostas ainda não decididas: testes baseados em propriedades (`fast-check`) no `core`; Testcontainers ou docker-compose de teste na `api`; relógio falso; testes "golden" do pipeline; varredura de segredos (gitleaks) na CI; React Testing Library e MSW no `web`; Playwright para poucos fluxos ponta a ponta; rotinas agendadas (contrato com o sandbox da Pluggy, restauração do backup, avaliação da IA); testes de mutação (Stryker); proteção na `main` exigindo a CI verde.
