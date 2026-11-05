# Segurança e operação

- **Rede:** dashboard e API só na rede local; o túnel expõe apenas o webhook ([ADR 06](../adr/adr-06-seguranca-webhook-e-tunel.md)).
- **Sessão Web ↔ API:** o Next.js encaminha `/api/*` para o AdonisJS (*rewrites*), mantendo a sessão num cookie `httpOnly`, `SameSite=Lax`, no mesmo domínio.
- **Login:** limite de tentativas (rate limiting) e 2FA obrigatório depois de ativado.
- **Segredos:** `CLIENT_ID`, `CLIENT_SECRET`, segredo do webhook e chave da aplicação ficam só no `.env` da API (nunca no `core` nem no `web`). O `totp_secret` é criptografado com a chave da aplicação.
- **Backup:** como a Pluggy entrega só ~12 meses de histórico, o Postgres do Centavo é o **único arquivo do passado**. `pg_dump` diário agendado, com cópia fora da máquina e restauração testada.
- **Visibilidade:** painel das filas (Bull Board) e tela de "última sincronização" baseada em `sync_runs`. Aviso no dashboard quando um item estiver com erro ou com consentimento perto de expirar.
- **Dados pessoais no repositório:** JSON bruto baixado da Pluggy (com dados reais dos seus bancos) nunca é commitado; só fixtures anonimizadas ([testes](testes.md)).
