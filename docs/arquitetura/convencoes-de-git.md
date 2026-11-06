# Convenções de branch, commit e PR

Padrões de nome para branches, commits e PRs. Complementam o fluxo de [ambientes, branches e releases](ambientes-e-branches.md). O porquê está no [registro de decisões](../decisoes/registro.md).

> **Revisão pendente:** estas convenções e o uso das Issues serão revistos.

## Tarefas
- As tarefas do projeto são **Issues do GitHub**. O número da Issue é o identificador da tarefa.
- O PR fecha a Issue com `Closes #N` na descrição.
- O [roadmap](../roadmap/roadmap.md) (fases) e as [pendências da Pluggy](../pluggy/pendencias.md) continuam no vault.
- Até a migração, o [backlog](../roadmap/backlog.md) segue no vault.

## Branches
- **Formato:** `tipo/N-descricao-curta`, em kebab-case, sem acento, com o número da Issue. Exemplo: `feat/12-login-com-totp`.
- **Tipos:**

| Tipo | Uso |
|---|---|
| `feat/` | funcionalidade nova |
| `fix/` | bug achado no desenvolvimento ou na homologação |
| `hotfix/` | bug da produção, branch criada a partir da `main` |
| `docs/` | só documentação |
| `refactor/` | mudança de código que não altera comportamento |
| `test/` | só testes |
| `chore/` | manutenção: dependências, configuração |
| `ci/` | pipeline da CI |

- **Sessões do Claude Code na nuvem:** a branch tem nome fixo (`claude/...`) e não segue o formato. Vale o título do PR, que é o que entra na `develop`.

## Commits e títulos de PR
- **Formato** ([Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)): `tipo(escopo): descrição`, em português.
- **Tipos:** os mesmos das branches, menos `hotfix`, que não existe no padrão; o hotfix usa `fix:`.
- **Escopo:** a parte do monorepo afetada (`api`, `web`, `core`), omitido quando a mudança é geral. Exemplos: `feat(api): login com TOTP`, `fix(web): filtro de mês do extrato`, `docs: fluxo de releases`.
- **`!` marca mudança que quebra compatibilidade:** `feat(api)!: ...`.
- **Corpo**, quando precisar, explica o porquê; o diff já mostra o quê.
- **O título do PR é o que mais importa:** com squash na `develop`, ele vira o commit e a linha das notas da release. Os commits dentro da branch podem ser mais soltos.
- **Verificação na CI** (Fase 0): PR com título fora do padrão é barrado.
