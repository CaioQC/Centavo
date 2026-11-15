# Backup

Como a Pluggy entrega só ~12 meses de histórico, o Postgres do Centavo é o **único arquivo do passado**: anotações do usuário e histórico mais antigo só existem nele. O porquê das regras abaixo está no [registro de decisões](../decisoes/registro.md).

## Regras
- **Quando entra:** no fim da Fase 2, antes da primeira release em produção, quando o banco passa a ter dados reais ([roadmap](../roadmap/roadmap.md)).
- **Diário:** `pg_dump` agendado, no formato compactado (`-Fc`).
- **Antes de cada release:** um backup logo antes de trocar a produção para a versão nova ([ambientes, branches e releases](ambientes-e-branches.md)). Voltar para a tag anterior não desfaz uma migration; esse backup sim.
- **Cópia fora da máquina, criptografada:** o arquivo é criptografado no PC (`age` ou `gpg`) antes de sair, e o serviço de armazenamento só guarda um arquivo ilegível. A chave fica num gerenciador de senhas, nunca no repositório.
- **Retenção:** os últimos 30 diários e os 3 feitos antes de release. Cada cópia tem poucos MB, então não vale um esquema de semanais e mensais.
- **Restauração testada:** cada ensaio de release começa restaurando o último backup num banco descartável ([ambientes, branches e releases](ambientes-e-branches.md)).

## Tamanho
Estimativa, a conferir com dados reais: com uso generoso (~300 transações por mês e um registro de saldo por dia para cada conta e investimento), o banco deve ficar em dezenas de MB mesmo depois de 10 anos, e cada backup compactado, em poucos MB. O Centavo não guarda o JSON bruto da Pluggy, que seria a parte pesada. Com a retenção acima, o total deve ficar abaixo de 300 MB.
