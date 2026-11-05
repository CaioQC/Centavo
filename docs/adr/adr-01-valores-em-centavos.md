---
tags: [adr]
status: aceita
data: 2026-11-02
---

# ADR 01: Precisão monetária (valores em centavos)

- **Decisão:** é proibido armazenar ou manipular valores financeiros como `Float` ou `Double`.
- **Regra:** todos os valores de transações, saldos, orçamentos e metas são armazenados como inteiros (`BIGINT`) representando **centavos**.
  $$\text{Valor Armazenado} = \text{Valor Real em BRL} \times 100$$
  *(Exemplo: R$ 49,90 é armazenado e processado como $4990$.)*
- **Conversão:** valores da Pluggy chegam como decimais; a conversão (`Math.round(valor * 100)`) acontece uma única vez, na borda, com uma função de `@centavo/core`. O sinal vem do campo `type`, não do sinal do número (ver `amount_in_cents` no [modelo de dados](../dominio/modelo-de-dados.md)).
- **No TypeScript:** o driver `pg` devolve `BIGINT` como `string`, e o tipo `bigint` do JS não é serializável em JSON. Os centavos circulam como `number` (seguro até `Number.MAX_SAFE_INTEGER`, ≈ R$ 90 trilhões), com conversão explícita na leitura do banco.
