---
tags: [adr]
status: suspensa
data: 2026-11-02
---

# ADR 05: Offline-first no mobile (suspensa)

> **Suspensa em 2026-11-04:** o app mobile saiu do roadmap e virou ideia futura; o foco é o web ([registro de decisões](../decisoes/registro.md)). O conteúdo abaixo fica como ponto de partida caso o mobile volte.

- **Decisão:** o app mobile deve responder instantaneamente ao abrir.
- **Regra:** **TanStack Query** com persistência local (MMKV / Async Storage), padrão *Stale-While-Revalidate*. O MMKV exige *development build* do Expo, não roda no Expo Go.
