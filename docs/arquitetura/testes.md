# Estratégia de testes

Stack enxuta: só três ferramentas (Vitest, Japa e Docker Compose), concentradas no que é arriscado no Centavo (dinheiro, datas e reconciliação). O porquê está no [registro de decisões](../decisoes/registro.md).

- **`@centavo/core` (Vitest):** conversão de centavos, `budget_month` de parcelas, virada de mês no fuso local, impressão digital, detecção de transferências e assinaturas, projeção de fatura. Data e hora congeladas com o **relógio falso** do Vitest (`vi.setSystemTime`), para os testes de fuso e virada de mês não dependerem do dia em que rodam.
- **`apps/api` (Japa):** testes de integração com PostgreSQL e Redis reais, pelo mesmo Docker Compose do desenvolvimento, num banco separado só para testes. A Pluggy é substituída por um *fake* alimentado com **fixtures gravadas dos seus próprios itens** (JSON bruto, com dados pessoais anonimizados) e do sandbox da Pluggy. O JSON bruto, antes de anonimizar, fica fora do git. O Ollama também é substituído por um *fake* ([IA local](ia-local.md)).
- **Teste "golden" da reconciliação (Fase 2):** uma fixture entra, a [reconciliação](../fluxos/reconciliacao.md) roda e o estado do banco é comparado com um resultado esperado guardado em arquivo; rodar duas vezes dá o mesmo resultado.
- **`apps/web`:** sem teste automatizado no começo. Toda regra que importa mora no `core`; o `web` só mostra dados e é testado à mão na homologação ([ambientes, branches e releases](ambientes-e-branches.md)).
- **CI:** lint, typecheck, testes e título do PR em todo push. **CI verde é obrigatória** para o merge na `develop`, na `homolog` e na `main`.
- **Segredos:** *push protection* de segredos do GitHub ligado no repositório.
- **Onde rodam:** os testes do `core` rodam em qualquer lugar; os da `api` precisam de Docker, então rodam no PC e na CI (nas sessões do Claude Code na nuvem o Docker não está ativo).

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
- Cada fase tem um `roadmap/fase-N.md` com as histórias e os **critérios de aceite** no formato Dado / Quando / Então. A Issue de cada funcionalidade aponta para os critérios dela nessa nota, sem copiá-los ([convenções](convencoes-de-git.md)).
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

## Considerar depois
Ficaram fora para manter a stack enxuta. Voltam quando um tipo de bug se repetir:
- **Bugs de tela:** React Testing Library e MSW (componentes) ou Playwright (poucos fluxos ponta a ponta, começando por login com TOTP).
- **Erros de conta com casos estranhos:** testes baseados em propriedades com `fast-check` no `core`.
- **Fake da Pluggy desatualizado:** teste semanal de contrato contra o sandbox. Até lá, aparece como bug e vira teste de regressão.
- **Qualidade dos testes do `core`:** testes de mutação (Stryker) e cobertura mínima.
- **Também:** Testcontainers no lugar do Docker Compose; gitleaks na CI; verificação mensal automática da restauração do backup (hoje ela é testada a cada promoção, ver [backup](backup.md)).
