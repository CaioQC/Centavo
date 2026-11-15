# Roadmap

| Fase | Status | Entrega |
|---|---|---|
| 0. Fundação | ⬜ Não iniciada | **Primeiro:** script avulso de estatísticas sobre os seus itens, que resolve as [pendências](../pluggy/pendencias.md). Depois: monorepo com pnpm workspaces (tsconfig e eslint na raiz), `docker-compose` (PostgreSQL + Redis), app AdonisJS 7, Japa e Vitest configurados, CI obrigatória para o merge na `develop` e na `main`. Ver [monorepo](../arquitetura/monorepo.md). |
| 1. Autenticação | ⬜ Não iniciada | App web (Vite + React + React Router + TanStack Query) e Tuyau, com a tela de login. Comando para criar o usuário, login, ativação de TOTP, comando para desligar o 2FA (no lugar de códigos de recuperação), rate limiting. |
| 2. Sincronização Pluggy | ⬜ Não iniciada | Cadastro de Item ID, reconciliação agendada e manual, renovação/reconexão de item, webhook seguro, upsert e soft delete, impressão digital e transferência de anotações, contas, investimentos e snapshots de saldo, `sync_runs` e painel de filas. **Antes da primeira release em produção:** script de [backup](../arquitetura/backup.md) (com criptografia e retenção) e o primeiro ensaio de release com o backup restaurado ([ambientes, branches e releases](../arquitetura/ambientes-e-branches.md)). |
| 3. Extrato e Categorias | ⬜ Não iniciada | Listagem e filtros, mapeamento Pluggy → categorias, recategorização, regras, detecção de transferências internas, contas e lançamentos manuais, lista "revisar". |
| 4. Orçamento | ⬜ Não iniciada | Limites por categoria e mês, cópia do mês anterior, regra do cartão parcelado, "já comprometido". Ver [orçamento do mês](../fluxos/orcamento-do-mes.md). |
| 5. Cartão | ⬜ Não iniciada | Faturas, agrupamento de parcelas, projeção de faturas, assinaturas sugeridas e confirmadas. Ver [projeção de fatura](../fluxos/projecao-de-fatura.md). |
| 6. Metas | ⬜ Não iniciada | Metas vinculadas a conta ou investimento e metas com aportes manuais. |
| 7. Pós-MVP | ⬜ Não iniciada | [IA local](../arquitetura/ia-local.md) (sugestão de categoria e de regra, perguntas sobre os gastos, resumo do mês), widget Pluggy Connect, deploy, [apoio ao Imposto de Renda](../fluxos/imposto-de-renda.md). (App mobile é ideia futura, fora do roadmap.) |

Status: ⬜ não iniciada · 🟨 em andamento · ✅ concluída. Cada fase é uma Milestone no GitHub, e as histórias e critérios de cada uma ficam em `fase-N.md` nesta pasta ([convenções](../arquitetura/convencoes-de-git.md)). Ao mudar o status de uma fase, registre a data no [registro de decisões](../decisoes/registro.md) se algo do plano tiver mudado. **Ao fechar uma fase,** escreva no fim do `fase-N.md` uma retrospectiva de umas cinco linhas: o que funcionou, o que travou e o que muda no processo. É o momento combinado para rever o processo.
