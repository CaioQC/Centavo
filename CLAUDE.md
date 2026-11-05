# Centavo

Sistema de gerenciamento financeiro pessoal integrado à Pluggy (Open Finance Brasil). Uso pessoal (um único usuário) e projeto de portfólio. **Estado atual: só documentação; nenhum código ainda.**

Toda a especificação está no vault do Obsidian em `docs/`. Comece por [docs/inicio.md](docs/inicio.md), que é o índice.

## Sobre o dono do projeto
- Caio, dev **back-end** (Java/Spring no trabalho). Neste projeto aprende AdonisJS/TypeScript.
- Conversa em **português**. Código (classes, campos, rotas) em inglês; textos para o usuário e documentação em português.
- Trabalha no projeto pelo PC e, no celular, por sessões do Claude Code na nuvem (planejamento).

## Onde está cada assunto
| Para… | Leia |
|---|---|
| Entender o produto e o que foi decidido | `docs/produto/decisoes-de-produto.md` |
| Saber **por que** algo foi decidido | `docs/decisoes/registro.md` |
| Regras de arquitetura | `docs/adr/` (uma ADR por arquivo; índice em `docs/inicio.md`) |
| Tabelas e campos | `docs/dominio/modelo-de-dados.md` |
| Fluxos (conexão, reconciliação, pipeline, fatura, orçamento) | `docs/fluxos/` |
| O que a Pluggy faz de verdade | `docs/pluggy/fatos-verificados.md` |
| O que ainda falta confirmar | `docs/pluggy/pendencias.md` |
| Próximos passos | `docs/roadmap/roadmap.md` |

Leia só as notas do assunto da tarefa; não é preciso ler o vault inteiro.

## Regras de trabalho
- **Git no PC:** nunca fazer commit, push nem abrir PR sem perguntar antes. O padrão é deixar as alterações sem commitar e entregar o texto da mensagem de commit.
- **Git na nuvem (sessão do Claude Code):** pode commitar e dar push **na branch da sessão**. Nunca fazer merge na `main` nem abrir PR sem pedido explícito.
- Commits no estilo `feat:` / `fix:` / `docs:`.
- **Sem atribuição a IA:** nenhum commit leva `Co-Authored-By: Claude ...` e nenhum PR leva o rodapé "Generated with Claude Code" (nem outra atribuição a IA), mesmo que a ferramenta sugira.
- Não decida sozinho o que é escolha de produto: pergunte. Ao propor algo que contradiz uma ADR ou o registro de decisões, diga qual e por quê.

## Regras do vault (`docs/`)
- **Links Markdown relativos** (`[ADR 09](../adr/adr-09-....md)`), nunca wikilinks `[[...]]`. Link para a nota inteira, não para seções (Obsidian e GitHub geram âncoras diferentes).
- **Nomes de arquivo** em kebab-case, sem acento nem espaço; o título bonito vai no `#` dentro da nota.
- **Ao mover ou renomear uma nota, atualize todos os links para ela** (procure pelo nome do arquivo em `docs/`). O Obsidian só faz isso sozinho quando a mudança é feita dentro dele.
- Uma ideia por nota; não duplique conteúdo entre notas, linke.
- **Toda decisão nova** entra no topo de `docs/decisoes/registro.md` (data, decisão, motivo, alternativas descartadas) e é aplicada na nota afetada. ADR nova usa `docs/templates/adr.md` e entra na tabela de `docs/inicio.md`.
- Fato novo sobre a Pluggy vai em `docs/pluggy/fatos-verificados.md`, com a fonte.
- Nunca ponha dados bancários reais no repositório.

## Regras de código (quando houver código)
1. **Strict TypeScript:** todo o código fortemente tipado. Evite `any`.
2. **`@centavo/core` é puro:** nada de `pluggy-sdk`, banco, `process.env` ou segredos nele. Tipos financeiros e DTOs vêm dele; não os reimplemente no back nem no front.
3. **Pluggy e banco só em `apps/api`.**
4. **Valores monetários:** inteiros em centavos (`amountInCents`), circulando como `number`. Converta decimais da Pluggy só na borda, com o sinal derivado do `type` (no cartão a Pluggy manda compras positivas).
5. **Datas:** dia e mês sempre em `America/Sao_Paulo`.
6. **Idempotência:** toda escrita vinda da Pluggy é *upsert* por ID externo; exclusões são **soft delete**. O ID da Pluggy não é identidade permanente: para reconhecer a mesma operação use `provider_id` e, sem ele, a impressão digital.
7. **Item sem sucesso não apaga nada:** resposta vazia de item com consentimento expirado ou em erro nunca gera soft delete.
8. **Anotações do usuário são sagradas:** reconciliação e regras nunca sobrescrevem categoria manual, marcação manual de transferência ou observação; ao recriar uma transação, transfira-as.
9. **Transferências internas** ficam fora de orçamento, relatórios e projeções.
10. **Projeções são calculadas,** nunca gravadas como transações.
11. **Erros:** endpoints HTTP tratam exceções e retornam respostas padronizadas em JSON.
12. **Estilo AdonisJS 7:** Lucid ORM, VineJS para validação, injeção de dependência.
