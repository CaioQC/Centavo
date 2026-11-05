# Modelo de dados

Tabelas com IDs UUID; valores monetários em centavos ([ADR 01](../adr/adr-01-valores-em-centavos.md)).

```text
[User] 1 ─── N [Item (Conexão Bancária)] ─── 1 ─── N [SyncRun]
                 ├─── 1 ─── N [Account (Conta/Cartão)]
                 └─── 1 ─── N [Investment]
[User] 1 ─── N [Account (Manual)]
[Account | Investment] 1 ─── N [BalanceSnapshot]
[Account] 1 ─── N [CreditCardBill]
[Account] 1 ─── N [Transaction] ─── N:1 [Category]
                       ├─── N:1 [CreditCardBill]
                       └─── N:1 [Subscription]
[Category] 1 ─── N [PluggyCategoryMapping] / [CategorizationRule] / [Budget]
[Goal] N ─── 0..1 [Account | Investment]      [Goal] 1 ─── N [GoalContribution]
```

## Usuário e conexões

### `users`
- `id`: UUID (PK)
- `email`: String (Unique)
- `password_hash`: String
- `totp_secret`: String (criptografado com a chave da aplicação, nulável até ativar)
- `totp_enabled`: Boolean
- `recovery_codes`: hashes dos códigos de recuperação

### `items` (cada conexão do Meu Pluggy)
- `id`: UUID (PK)
- `user_id`: UUID (FK -> users.id)
- `pluggy_item_id`: String (Unique)
- `institution_name`: String
- `status`: Enum (`UPDATING`, `UPDATED`, `OUTDATED`, `LOGIN_ERROR`, `WAITING_USER_INPUT`)
- `execution_status`: String (nulável; guardado como vem, ex.: `SUCCESS`, `PARTIAL_SUCCESS`, `USER_AUTHORIZATION_REVOKED`, `USER_AUTHORIZATION_EXPIRED`)
- `consent_expires_at`: Timestamp (nulável; vem de `consentExpiresAt`; no Meu Pluggy, um ano após a autorização)
- `replaced_by_item_id`: UUID (FK -> items.id, nulável; preenchido quando o banco é reconectado com novo Item ID)
- `last_synced_at`: Timestamp
- `error_message`: String (nulável)

### `sync_runs` (observabilidade da reconciliação, [ADR 03](../adr/adr-03-reconciliacao-periodica.md))
- `id`: UUID (PK)
- `item_id`: UUID (FK -> items.id)
- `trigger`: Enum (`SCHEDULE`, `WEBHOOK`, `MANUAL`, `INITIAL`)
- `started_at` / `finished_at`: Timestamp
- `status`: Enum (`RUNNING`, `SUCCESS`, `FAILED`)
- `stats`: JSON (inseridas, atualizadas, removidas, anotações transferidas)
- `error_message`: String (nulável)

## Contas, investimentos e saldos

### `accounts` (contas correntes, poupanças, cartões e contas manuais)
- `id`: UUID (PK)
- `user_id`: UUID (FK -> users.id)
- `item_id`: UUID (FK -> items.id, nulável para contas manuais)
- `source`: Enum (`PLUGGY`, `MANUAL`)
- `pluggy_account_id`: String (Unique, nulável)
- `number`: String (nulável; usado para religar a conta se o banco for reconectado com IDs novos)
- `name`: String
- `type`: Enum (`BANK`, `CREDIT_CARD`, `CASH`)
- `balance_in_cents`: BigInt (no cartão: saldo devedor)
- `credit_limit_in_cents`: BigInt (nulável; só cartão)
- `currency_code`: String (padrão `BRL`)
- `archived_at`: Timestamp (nulável)

### `investments` (vêm de `GET /investments` da Pluggy; não são contas)
- `id`: UUID (PK)
- `item_id`: UUID (FK -> items.id)
- `pluggy_investment_id`: String (Unique)
- `name`: String
- `type` / `subtype`: String (como vêm da Pluggy)
- `balance_in_cents`: BigInt

### `balance_snapshots` ([ADR 04](../adr/adr-04-saldos-da-pluggy.md))
- `id`: UUID (PK)
- `account_id` **ou** `investment_id`: UUID (exatamente um preenchido, garantido por `CHECK`)
- `date`: Date
- `balance_in_cents`: BigInt
- Único em (`account_id`, `date`) e em (`investment_id`, `date`)

## Transações

### `transactions` (extrato)
- `id`: UUID (PK)
- `account_id`: UUID (FK -> accounts.id)
- `pluggy_transaction_id`: String (Unique, nulável para lançamentos manuais; [ADR 02](../adr/adr-02-idempotencia-e-ciclo-de-vida.md))
- `provider_id`: String (nulável; identificador da instituição, só em conectores Open Finance; indexado)
- `description`: String
- `pluggy_type`: Enum (`DEBIT`, `CREDIT`; nulável para manuais)
- `amount_in_cents`: BigInt (positivo para receitas e estornos, negativo para despesas). Normalizado a partir do `type` da Pluggy, **não** do sinal: no cartão a Pluggy manda compras **positivas** e o pagamento da fatura negativo, o inverso da conta corrente. Em compra internacional, usa-se `amountInAccountCurrency` (valor já convertido para BRL).
- `original_currency_code` / `original_amount_in_cents`: nuláveis; valor na moeda original de compras internacionais
- `date`: Date (local, [ADR 10](../adr/adr-10-datas-e-fuso-horario.md))
- `budget_month`: Date (primeiro dia do mês; [ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md))
- `budget_month_estimated`: Boolean ([ADR 11](../adr/adr-11-orcamento-cartao-parcelado.md))
- `status`: Enum (`PENDING`, `POSTED`) — no cartão, `PENDING` significa "fatura ainda aberta"
- `pluggy_category_id`: String (nulável; categoria bruta da Pluggy)
- `category_id`: UUID (FK -> categories.id, nulável)
- `category_source`: Enum (`PLUGGY_MAP`, `RULE`, `MANUAL`; [ADR 07](../adr/adr-07-categorizacao-em-camadas.md))
- `is_internal_transfer`: Boolean ([ADR 08](../adr/adr-08-transferencias-internas.md))
- `transfer_source`: Enum (`AUTO`, `MANUAL`, nulável)
- `transfer_pair_id`: UUID (FK -> transactions.id, nulável)
- `bill_id`: UUID (FK -> credit_card_bills.id, nulável; a Pluggy só informa quando a fatura fecha)
- `installment_number` / `total_installments`: Int (nuláveis)
- `installment_total_in_cents`: BigInt (nulável; a Pluggy só envia o total em conectores diretos, não em Open Finance; por isso não serve de chave)
- `installment_group_key`: String (nulável; agrupa as parcelas da mesma compra por heurística, já que o Open Finance não tem ID de grupo: total de parcelas + data da parcela 1 + descrição/estabelecimento normalizado + valor da parcela)
- `subscription_id`: UUID (FK -> subscriptions.id, nulável)
- `note`: String (nulável)
- `fingerprint`: String (indexado; [ADR 09](../adr/adr-09-anotacoes-sobrevivem-troca-de-id.md))
- `deleted_at`: Timestamp (nulável; soft delete)
- `replaced_by_id`: UUID (FK -> transactions.id, nulável)

### `credit_card_bills`
- `id`: UUID (PK)
- `account_id`: UUID (FK -> accounts.id)
- `pluggy_bill_id`: String (Unique, nulável)
- `closing_date` / `due_date`: Date (a Pluggy só informa a data de fechamento em conexões criadas a partir de 07/2026)
- `total_in_cents`: BigInt
- `status`: Enum (`OPEN`, `CLOSED`, `PAID`)

### `subscriptions` (assinaturas recorrentes)
- `id`: UUID (PK)
- `account_id`: UUID (FK -> accounts.id)
- `description_pattern`: String
- `expected_amount_in_cents`: BigInt
- `day_of_month`: Int
- `status`: Enum (`SUGGESTED`, `CONFIRMED`, `DISMISSED`)

## Categorias e orçamento

### `categories`
- `id`: UUID (PK)
- `name`: String
- `kind`: Enum (`EXPENSE`, `INCOME`, `TRANSFER`)
- `icon`: String
- `color`: String

### `pluggy_category_mappings`
- `pluggy_category_id`: String (PK)
- `category_id`: UUID (FK -> categories.id)

### `categorization_rules`
- `id`: UUID (PK)
- `field`: Enum (`DESCRIPTION`, …)
- `pattern`: String (ex.: contém `IFOOD`)
- `category_id`: UUID (FK -> categories.id)
- `priority`: Int

### `budgets`
- `id`: UUID (PK)
- `month`: Date (primeiro dia do mês)
- `category_id`: UUID (FK -> categories.id)
- `limit_in_cents`: BigInt
- Único em (`month`, `category_id`)

## Metas

### `goals`
- `id`: UUID (PK)
- `name`: String
- `target_in_cents`: BigInt
- `deadline`: Date (nulável)
- `account_id` / `investment_id`: UUID (nuláveis, no máximo um; se preenchido, o progresso é o saldo)

### `goal_contributions` (só para metas sem conta ou investimento vinculado)
- `id`: UUID (PK)
- `goal_id`: UUID (FK -> goals.id)
- `amount_in_cents`: BigInt
- `date`: Date
- `note`: String (nulável)
