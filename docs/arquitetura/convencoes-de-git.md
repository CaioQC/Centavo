# Convenções de branch, commit e PR

Padrões de nome para branches, commits e PRs. Complementam o fluxo de [ambientes, branches e releases](ambientes-e-branches.md). O porquê está no [registro de decisões](../decisoes/registro.md).

## Tarefas (híbrido: vault e Issues)
Cada lugar responde a uma pergunta, e nada é duplicado.
- **`roadmap/fase-N.md` responde "o que precisa fazer":** as histórias e os critérios de aceite de cada fase (Dado / Quando / Então). É a especificação, versionada junto com os testes ([testes](testes.md)). **Sem checkbox de status.**
- **Issues do GitHub respondem "em que pé está":** status, branch, PR e discussão. O número da Issue é o identificador da tarefa, e o PR fecha a Issue com `Closes #N`. A Issue de uma história **aponta para ela** no `fase-N.md` e **nunca copia os critérios**.
- **Milestone = fase do roadmap:** cada Issue de uma fase entra na Milestone dela, que mostra o progresso sozinha.
- **Só como Issue:** bugs, ideias soltas e dívida técnica, que não têm lugar no `fase-N.md`.
- **No vault continuam:** o [roadmap](../roadmap/roadmap.md), com o status de cada fase, e as [pendências da Pluggy](../pluggy/pendencias.md).
- Até a migração, o [backlog](../roadmap/backlog.md) segue no vault.

## Branches
- **Formato:** `tipo/N-descricao-curta`, em kebab-case, sem acento. Exemplo: `feat/12-login-com-totp`.
- **Número da Issue (`N`):** obrigatório em `feat`, `fix` e `hotfix`; opcional nos outros tipos (ex.: `docs/corrige-link-do-roadmap`).
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

- **Branches `claude/...`:** só existem nas sessões do Claude Code na nuvem, que recebem esse nome fixo e não seguem o formato ([uso de IA no desenvolvimento](uso-de-ia-no-desenvolvimento.md)).

## Commits e títulos de PR
- **Formato** ([Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)): `tipo(escopo): descrição`, em português.
- **Tipos:** os mesmos das branches, menos `hotfix`, que não existe no padrão; o hotfix usa `fix:`.
- **Escopo:** a parte afetada: `api`, `web`, `core` ou `infra` (Docker Compose, script de backup, instância de homologação). Omitido quando a mudança é geral.
- **Descrição:** verbo no presente, em minúscula, sem ponto final, até uns 70 caracteres. Exemplos: `feat(api): adiciona login com TOTP`, `fix(web): corrige filtro de mês do extrato`, `docs: descreve fluxo de releases`.
- **`!` marca mudança que quebra compatibilidade:** `feat(api)!: ...`.
- **Corpo**, quando precisar, explica o porquê; o diff já mostra o quê.
- **O título do PR é o que mais importa:** com squash na `develop`, ele vira o commit e a linha das notas da release. Os commits dentro da branch podem ser mais soltos.
- **Verificação na CI** (Fase 0): PR com título fora do padrão é barrado.

## PRs de promoção e de volta
Também passam pela verificação do título ([ambientes, branches e releases](ambientes-e-branches.md)):
| PR | Título |
|---|---|
| `develop` → `homolog` | `chore(release): v0.4.0 para homologação` |
| `homolog` → `main` | `chore(release): v0.4.0` |
| `main` → `develop` | `chore(release): main de volta para a develop (v0.4.1)` |

## Descrição do PR
- O modelo em `.github/pull_request_template.md` é preenchido sozinho ao abrir o PR: Issue (`Closes #N`), o que mudou, como testar e um checklist com as regras do projeto (teste de regressão, critérios do `fase-N.md`, registro de decisões, hotfix de risco).

## Configurações do GitHub
- **Squash:** a mensagem do commit é o título e a descrição do PR, não a lista de commits da branch.
- **Branch apagada automaticamente** depois do merge.

## Contribuições do Claude
- Branches `claude/...`, PRs em rascunho com a label `claude`, revisão e co-autoria: ver [uso de IA no desenvolvimento](uso-de-ia-no-desenvolvimento.md).
