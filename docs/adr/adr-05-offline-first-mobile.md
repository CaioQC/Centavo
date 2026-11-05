---
tags: [adr]
status: aceita
data: 2026-11-02
---

# ADR 05: Offline-first no mobile (pós-MVP)

- **Decisão:** o app mobile deve responder instantaneamente ao abrir.
- **Regra:** **TanStack Query** com persistência local (MMKV / Async Storage), padrão *Stale-While-Revalidate*. O MMKV exige *development build* do Expo, não roda no Expo Go.
- **Quando:** só na fase pós-MVP do [roadmap](../roadmap/roadmap.md).
