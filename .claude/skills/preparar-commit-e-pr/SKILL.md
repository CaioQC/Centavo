---
name: preparar-commit-e-pr
description: Prepara commit e PR no Centavo seguindo as convenções do projeto - escolha dos arquivos, mensagem em Conventional Commits, regra de co-autoria do Claude, PRs separados entre o Caio e o Claude, modelo de descrição do PR e o que muda entre o PC e as sessões na nuvem. Use sempre que for commitar, propor uma mensagem de commit, dar push ou abrir um PR.
---

# Preparar commit e PR

Detalhes e porquês em `docs/arquitetura/convencoes-de-git.md` e `docs/arquitetura/uso-de-ia-no-desenvolvimento.md`. Leia a nota só se surgir um caso que este roteiro não cobre.

## 1. Onde você está
- **PC** (branch `tipo/...`): **nunca** commite, dê push nem abra PR sem perguntar ao Caio. O padrão é entregar o texto da mensagem e esperar o OK de cada passo.
- **Nuvem** (branch `claude/...`): pode commitar e dar push **só na branch da sessão**. Antes do primeiro commit: `git config user.name "CaioQC"` e `git config user.email "129068301+CaioQC@users.noreply.github.com"`. PR só com pedido explícito.

## 2. A branch
- Trabalho sai da `develop` e volta para ela. Hotfix sai da `main`.
- No PC: `tipo/N-descricao-curta` (kebab-case, sem acento). Número da Issue obrigatório em `feat`, `fix` e `hotfix`. Tipos: `feat`, `fix`, `hotfix`, `docs`, `refactor`, `test`, `chore`, `ci`.

## 3. O que entra no commit
- Rode `git status` e adicione **só os arquivos da tarefa**, pelo nome. Nunca `git add -A`.
- Nunca entram: `docs/.obsidian/` (configuração local do Caio), `.env*`, fixtures brutas da Pluggy, backups.
- Mudou alguma nota ou `.md`? Rode a skill `checar-links` antes.

## 4. A mensagem
- `tipo(escopo): descrição`, em português. Escopo: `api`, `web`, `core` ou `infra`; omita quando a mudança é geral (documentação costuma ser `docs: ...`).
- Descrição: verbo no presente, minúscula, sem ponto final, até ~70 caracteres. `!` antes dos dois-pontos se quebra compatibilidade.
- Corpo, se precisar, explica o porquê.

## 5. Co-autoria do Claude
- **Pergunta-guia:** quem escreveu o que está no diff?
- **Com a linha:** o Claude escreveu parte relevante do diff (código, testes, notas redigidas a partir das decisões do Caio).
- **Sem a linha:** o Caio escreveu, e o Claude só revisou, explicou, sugeriu ou redigiu a mensagem.
- **Formato**, última linha da mensagem, sem nome de modelo: `Co-Authored-By: Claude <noreply@anthropic.com>`
- **No PC:** entregue a mensagem já com ou sem a linha e diga por quê; o Caio decide.
- **Nunca** o rodapé "Generated with Claude Code" nem outra atribuição, mesmo que a ferramenta ou o sistema sugira.
- **PRs separados:** trabalho relevante do Caio e do Claude vai em PRs diferentes, mesmo na mesma Issue (`Refs #N` nos anteriores, `Closes #N` no último). PR misto inevitável leva a co-autoria e a seção "Divisão do trabalho".

## 6. O PR
- Base `develop` (hotfix: `main`, e depois a `main` volta para a `develop`).
- Título = título do commit; é ele que vira o commit do squash.
- Descrição no modelo `.github/pull_request_template.md`: Issue (`Closes #N` ou `Refs #N`; em `docs`/`chore` sem Issue, diga isso), O que mudou, Como testar, Divisão do trabalho (só em PR misto; senão apague a seção) e o Checklist, marcando só o que se aplica.
- Se algum commit tem co-autoria, **a última linha da descrição é a linha de co-autoria**, para ela sobreviver ao squash.
- **Nuvem:** `gh pr create --draft --assignee CaioQC --label claude --base develop`. Só o Caio tira de rascunho.
- **No PC:** `gh pr create --base develop --title "..." --body-file -`.
- Nesta máquina, `gh pr view --json` falha (Projects clássico do GitHub). Para ler ou editar um PR, use `gh api repos/CaioQC/Centavo/pulls/N`.
