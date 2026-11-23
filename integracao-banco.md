# Integração do Painel a Banco de Dados Real

## O que foi feito

O painel de satisfação foi conectado ao banco do Lovable Cloud. Foram criadas três tabelas: `support_agents` (id, nome, e-mail), `support_tickets` (id, agent_id, status, data_resolucao) e `ticket_ratings` (id, ticket_id, nota, data_avaliacao). O painel lê a média das notas agrupada por agente, considerando apenas tickets com status "resolvido" no último mês. Os dados foram populados com cinco agentes, vinte tickets e vinte avaliações distribuídas no período.

## Limitações arquiteturais do esquema imposto ou sugerido pela plataforma

**Tipos de dado limitados.** O Lovable Cloud oferece um conjunto restrito de tipos, sem suporte nativo a tipos compostos, enums ou validações de domínio no nível do banco. A nota de avaliação, por exemplo, é armazenada como inteiro, e a restrição de que ela deve estar entre 1 e 5 fica na aplicação, não no banco. Se o painel crescer além de um protótipo, essa validação dispersa se torna um risco de integridade.

**Dificuldade de expressar relacionamentos complexos.** O esquema relacional do Lovable Cloud é simples e não oferece suporte nativo a relacionamentos muitos-para-muitos com atributos, nem a chaves estrangeiras compostas. Para o Nimbus Desk, que tem tickets relacionados a clientes, agentes, categorias e histórico de status, o esquema da plataforma exigiria várias tabelas de junção manuais e perderia a modelagem mais rica que o banco do backend Flask já tem.

**Ausência de migrações versionadas.** As alterações de esquema no Lovable Cloud são feitas pela interface da plataforma, sem um histórico versionado de migrações. Isso significa que uma mudança de schema não pode ser revisada em pull request, não tem rollback automatizado e não é reproduzível em outro ambiente. Para o Nimbus Desk, que precisa de rastreabilidade de mudanças, isso é uma limitação séria.

**Como cada limitação afetaria o Nimbus Desk se o painel crescesse além de um protótipo.** A validação de nota fora do banco abriria espaço para dados inconsistentes que quebrariam a média exibida. A dificuldade de relacionamentos complexos forçaria uma modelagem empobrecida, que não acomodaria as regras de negócio do Nimbus Desk sem gambiarras. A ausência de migrações versionadas impediria a auditoria de mudanças e a reprodução de ambientes, o que é inaceitável para um sistema em produção.
