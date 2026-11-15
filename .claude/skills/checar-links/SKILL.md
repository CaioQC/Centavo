---
name: checar-links
description: Confere os links das notas do Centavo (docs/, CLAUDE.md, .claude/, .github/) com um script fixo - links Markdown quebrados, wikilinks, links para seção e caminhos entre crases que não existem. Use depois de criar, mover, renomear ou editar notas, e antes de commitar mudanças em arquivos .md.
---

# Checar links

Rode na raiz do repositório:

```bash
node .claude/skills/checar-links/checar-links.mjs
```

Para conferir só alguns arquivos, passe os caminhos: `node .claude/skills/checar-links/checar-links.mjs docs/inicio.md CLAUDE.md`.

Não escreva outro verificador: o script dá sempre o mesmo resultado e não gasta tokens.

## Como ler a saída
Cada linha é `arquivo:linha  problema  alvo`; o código de saída é 1 se houver problema.
- **link quebrado:** o arquivo não existe. Corrija o caminho relativo ou, se a nota foi renomeada, atualize o link.
- **wikilink:** troque `[[...]]` por link Markdown relativo (`[texto](../pasta/nota.md)`).
- **link para seção:** linke a nota inteira; Obsidian e GitHub geram âncoras diferentes.
- **caminho entre crases não existe:** um caminho como `docs/...md` citado no texto aponta para arquivo que não existe.

O script ignora blocos de código, `docs/templates/`, `docs/.obsidian/` e os exemplos de propósito (`caminho/relativo.md`, nomes com `...` e `fase-N.md`).

As regras dos links estão no `CLAUDE.md`, seção "Regras do vault".
