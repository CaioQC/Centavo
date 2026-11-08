<!-- Título no padrão `tipo(escopo): descrição` (docs/arquitetura/convencoes-de-git.md). -->

## Issue
<!-- Obrigatório em feat, fix e hotfix; opcional nos outros tipos. -->
Closes #

## O que mudou


## Como testar


## Checklist
- [ ] `fix` ou `hotfix`: tem teste de regressão, escrito antes da correção e visto falhando sem ela (ou o motivo de não ter)
- [ ] Funcionalidade: os critérios de aceite do `fase-N.md` estão cobertos por testes
- [ ] Decisão nova: registrada em `docs/decisoes/registro.md` e aplicada nas notas afetadas
- [ ] Hotfix que mexe em migration, reconciliação ou anotações: testado antes na instância de homologação
