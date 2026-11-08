<!-- Título no padrão `tipo(escopo): descrição` (docs/arquitetura/convencoes-de-git.md). -->

## Issue
<!-- Obrigatório em feat, fix e hotfix; opcional nos outros tipos. Use `Refs #N` se outro PR ainda vai completar a Issue. -->
Closes #

## O que mudou


## Como testar


## Divisão do trabalho
<!-- Só em PR misto, com trabalho relevante do Caio e do Claude que não deu para separar. Ex.: "API (apps/api/...): Caio. Telas (apps/web/...): Claude". Apague a seção se não se aplica. -->


## Checklist
- [ ] `fix` ou `hotfix`: tem teste de regressão, escrito antes da correção e visto falhando sem ela (ou o motivo de não ter)
- [ ] Funcionalidade: os critérios de aceite do `fase-N.md` estão cobertos por testes
- [ ] Decisão nova: registrada em `docs/decisoes/registro.md` e aplicada nas notas afetadas
- [ ] Hotfix que mexe em migration, reconciliação ou anotações: testado antes na instância de homologação
- [ ] Commits com co-autoria do Claude: a última linha desta descrição é `Co-Authored-By: Claude <noreply@anthropic.com>`
