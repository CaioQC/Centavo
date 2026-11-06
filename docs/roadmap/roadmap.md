# Roadmap

| Fase | Status | Entrega |
|---|---|---|
| 0. Fundação | ⬜ Não iniciada | Monorepo (pnpm, Turborepo, tsconfig, eslint), `docker-compose` (PostgreSQL + Redis), app AdonisJS 7 e web (Vite + React + React Router + TanStack Query), Japa e Vitest configurados, CI, script de backup. Ver [monorepo](../arquitetura/monorepo.md). |
| 1. Autenticação | ⬜ Não iniciada | Comando para criar o usuário, login, ativação de TOTP, códigos de recuperação, rate limiting. |
| 2. Sincronização Pluggy | ⬜ Não iniciada | **Primeiro:** script que baixa o JSON bruto dos seus itens e resolve as [pendências](../pluggy/pendencias.md). Depois: cadastro de Item ID, reconciliação agendada e manual, renovação/reconexão de item, webhook seguro, upsert e soft delete, impressão digital e transferência de anotações, contas, investimentos e snapshots de saldo, `sync_runs` e painel de filas. |
| 3. Extrato e Categorias | ⬜ Não iniciada | Listagem e filtros, mapeamento Pluggy → categorias, recategorização, regras, detecção de transferências internas, contas e lançamentos manuais, lista "revisar". [IA local](../arquitetura/ia-local.md): sugestão de categoria e de regra, perguntas sobre os gastos. |
| 4. Orçamento | ⬜ Não iniciada | Limites por categoria e mês, cópia do mês anterior, regra do cartão parcelado, "já comprometido". Ver [orçamento do mês](../fluxos/orcamento-do-mes.md). Resumo do mês pela [IA local](../arquitetura/ia-local.md). |
| 5. Cartão | ⬜ Não iniciada | Faturas, agrupamento de parcelas, projeção de faturas, assinaturas sugeridas e confirmadas. Ver [projeção de fatura](../fluxos/projecao-de-fatura.md). |
| 6. Metas | ⬜ Não iniciada | Metas vinculadas a conta ou investimento e metas com aportes manuais. |
| 7. Pós-MVP | ⬜ Não iniciada | Widget Pluggy Connect, deploy, [apoio ao Imposto de Renda](../fluxos/imposto-de-renda.md). (App mobile é ideia futura, fora do roadmap.) |

Status: ⬜ não iniciada · 🟨 em andamento · ✅ concluída. Ao mudar o status de uma fase, registre a data no [registro de decisões](../decisoes/registro.md) se algo do plano tiver mudado.
