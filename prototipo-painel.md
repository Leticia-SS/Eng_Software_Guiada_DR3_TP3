# Protótipo do Painel de Satisfação

## Especificação de produto

O painel de satisfação do cliente exibe a nota média de avaliação dos tickets resolvidos no último mês, agrupada por agente de suporte. Cada agente é representado por uma linha com nome, número de tickets resolvidos no período e nota média (de 1 a 5). O painel tem um filtro de período com opção padrão "último mês" e um seletor de agente para destacar uma linha específica. Os dados são lidos de uma tabela de avaliações que relaciona ticket, agente e nota. O painel é somente leitura: não permite editar notas nem cadastrar agentes. A ordenação padrão é por nota média decrescente, com desempate pelo número de tickets resolvidos. O painel exibe uma mensagem de estado vazio quando não há avaliações no período. O layout é responsivo e usa a paleta roxa do Nimbus Desk. O painel é destinado a gestores de suporte e não exige autenticação nesta versão de demonstração.

## Prompt usado no Lovable

"Crie um painel de satisfação do cliente para o Nimbus Desk. O painel exibe a nota média de avaliação dos tickets resolvidos no último mês, agrupada por agente de suporte. Cada linha mostra o nome do agente, o número de tickets resolvidos no período e a nota média de 1 a 5. Inclua um filtro de período com opção padrão 'último mês' e um seletor para destacar um agente específico. A ordenação padrão é por nota média decrescente, com desempate pelo número de tickets resolvidos. Exiba uma mensagem de estado vazio quando não houver avaliações. O painel é somente leitura, usa a paleta roxa do Nimbus Desk e deve ser responsivo. Popule com dados simulados de pelo menos cinco agentes e vinte avaliações distribuídas no último mês."

## O que o protótipo atendeu integralmente

O protótipo exibiu a nota média por agente, o número de tickets resolvidos, a ordenação por nota média decrescente com desempate pelo volume, o filtro de período com padrão "último mês", o seletor de agente e a mensagem de estado vazio. A paleta roxa foi aplicada e o layout respondeu bem em telas menores.

## O que exigiu ajuste manual após a geração

O filtro de período inicialmente não recalculava a nota média ao mudar o intervalo; foi necessário pedir ao Lovable que a agregação fosse refeita a cada mudança de filtro. O seletor de agente, na primeira versão, filtrava a lista em vez de destacar a linha; foi ajustado para destacar sem remover os demais agentes. A mensagem de estado vazio não aparecia quando o filtro não retornava resultados; foi adicionada após um segundo prompt.

## Links e artefatos

- Protótipo publicado: https://nimbus-rating-radar.lovable.app
- Evidências visuais: capturas de tela do painel com dados, do filtro aplicado e do estado vazio estão na pasta `prototipo-painel-evidencias/` do repositório.
