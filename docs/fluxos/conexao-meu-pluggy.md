# Conexão de banco (Meu Pluggy), renovação e reconexão

## Conexão (MVP)
1. O usuário conecta o banco em `meu.pluggy.ai` (autenticação e consentimento acontecem lá).
2. No dashboard da Pluggy, na aplicação do Centavo, usa *Connect Account* com o conector **MeuPluggy** e copia o **Item ID** de cada banco em *Connected Items*.
3. Cadastra o Item ID no dashboard do Centavo (`POST /items`).
4. A API valida o item na Pluggy e enfileira a **reconciliação inicial** (`trigger = INITIAL`), que traz até ~12 meses de histórico ([reconciliação](reconciliacao.md)).

## Expiração, renovação e reconexão
- **Aviso:** a partir de 30 dias antes de `consent_expires_at`, o dashboard avisa que a autorização vai expirar.
- **Expirada ou revogada:** as leituras da Pluggy voltam vazias e a próxima atualização falha com `USER_AUTHORIZATION_EXPIRED` (item em `LOGIN_ERROR`, webhook `item/error`). A reconciliação **não** trata resposta vazia de item nesse estado como "tudo foi apagado": sem `SUCCESS`/`PARTIAL_SUCCESS`, nenhuma transação recebe soft delete.
- **Renovação:** refazer o passo 2. A Pluggy recomenda não presumir que o Item ID será o mesmo.
- **Item ID novo:** o usuário cadastra o novo ID informando qual item ele substitui (`replaced_by_item_id`). As contas são religadas pelo `number` + tipo; investimentos pelo nome + tipo. As transações chegam com IDs novos e são reconhecidas pelo `provider_id` ou pela impressão digital ([ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md)), herdando as anotações em vez de duplicar. Contas sem correspondência vão para revisão manual.

## Conexão via Pluggy Connect (pós-MVP)
1. O app solicita ao backend um `connectToken` (`pluggyClient.createConnectToken()`).
2. O frontend abre o widget **Pluggy Connect**; o usuário autentica no banco.
3. O widget retorna o `itemId`, e o fluxo segue como no passo 4 da conexão acima.
