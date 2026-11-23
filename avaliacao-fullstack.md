# Avaliação da Aplicação Full-Stack Gerada por IA

## O que foi construído

O portal de acompanhamento de ticket permite que o cliente informe um código de protocolo e consulte o status do ticket. A consulta é feita por uma função de serviço isolada em `src/services/tickets.ts`, que chama o endpoint `GET /tickets` do backend Flask do Nimbus Desk e, em caso de indisponibilidade, cai em um mock local com o mesmo contrato de resposta. O portal exibe o status atual com destaque, a linha do tempo do histórico e mensagens de erro distintas para protocolo não informado, protocolo inexistente e falha de conexão. O scaffolding inicial foi gerado pelo Lovable a partir do prompt, e a função de serviço e o tratamento de erro foram ajustados manualmente após a geração.

## Limitações arquiteturais para uso em produção

**Segurança do endpoint exposto ao público.** O portal é público e somente leitura, mas a consulta por protocolo cria uma superfície de exposição: qualquer pessoa que descubra ou adivinhe um protocolo consegue ler o status e o histórico do ticket. O endpoint `GET /tickets` do TP1 não foi projetado para ser público, e expô-lo sem autenticação significa que o portal precisa, no mínimo, de um identificador de protocolo não sequencial e não adivinhável, além de rate limiting para evitar enumeração. O código gerado pelo Lovable não implementa nenhuma dessas proteções; a função de serviço apenas repassa o protocolo e confia na resposta do backend. Em produção, isso é insuficiente.

**Tratamento de erros.** O código gerado trata os três casos previstos no prompt (protocolo vazio, 404 e falha de rede), mas o tratamento é genérico: a mensagem de falha de rede não distingue timeout de DNS, e não há retry com backoff. Além disso, a distinção entre "protocolo inexistente" e "protocolo existe mas o backend está fora do ar" depende de o backend retornar códigos HTTP consistentes, o que o portal não valida. Em produção, o tratamento de erro precisaria ser mais granular e alinhado ao contrato real do backend.

**Organização do código gerado.** O código gerado pelo Lovable organiza o portal em componentes de página e componentes de apresentação, o que é razoável. A função de serviço isolada em `src/services/tickets.ts` foi uma decisão manual para separar a chamada de API da camada de apresentação, porque o código gerado originalmente misturava a chamada `fetch` dentro do componente de busca. Ainda assim, o código gerado tende a duplicar lógica de formatação de data e status em mais de um componente, e não há testes automatizados no projeto gerado. Para produção, seria necessário extrair utilitários compartilhados e adicionar testes de unidade para a função de serviço.

## Trade-offs das ferramentas AI-native usadas neste TP

A geração de aplicações a partir de linguagem natural e o scaffolding automático entregam um ganho de velocidade de entrega real: o portal do Exercício 9 saiu de uma descrição em texto para uma aplicação funcional publicada em questão de minutos, e o mesmo vale para o formulário do Exercício 1 e o painel do Exercício 6. O custo desse ganho aparece nos riscos arquiteturais levantados ao longo do TP: o código gerado não implementa as proteções de segurança que um endpoint público exige, o tratamento de erro é genérico, a organização do código mistura camadas e não há testes automatizados. A conclusão é que as ferramentas AI-native são adequadas para prototipagem e para validar a experiência do usuário, mas não substituem a decisão arquitetural de um time de engenharia. Para o Nimbus Desk, o caminho é usar a geração por IA para acelerar a primeira versão e, antes de qualquer lançamento em produção, migrar o código para o backend Flask com autenticação, rate limiting, tratamento de erro granular e testes automatizados.

## Links e artefatos

- Portal publicado: https://nimbus-rating-radar.lovable.app
