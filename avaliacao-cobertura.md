# Avaliação de Cobertura de Testes do Formulário de Ticket

## Pedido feito à IA

"Gere casos de teste adicionais para um formulário público de abertura de ticket com os campos nome, e-mail, categoria e descrição. Cubra casos de borda (descrição vazia, e-mail malformado, categoria inexistente) e casos de falha (envio duplicado, perda de conexão durante o envio). Liste cada caso com entrada, comportamento esperado e criticidade."

## Casos gerados pela IA

A IA listou casos de descrição vazia, e-mail malformado, categoria inexistente, envio duplicado por duplo clique e perda de conexão durante o envio, com comportamento esperado e criticidade para cada um. A lista cobre bem os casos de borda óbvios e os dois casos de falha pedidos no enunciado.

## Crítica à cobertura gerada

A lista da IA é correta, mas genérica. Ela cobre o que foi pedido explicitamente no prompt e para por aí. Para um formulário público de suporte ao cliente, faltam casos que só aparecem quando se pensa no uso real, não no caminho feliz. Dois casos relevantes que a IA não considerou:

**Caso adicional 1 - Descrição composta apenas de espaços ou caracteres invisíveis.** Um cliente pode colar a descrição de outro sistema, e o texto pode vir com espaços, tabs ou caracteres de controle. Se o formulário contar caracteres brutos, uma descrição com 20 espaços passa na validação de tamanho, mas não tem conteúdo útil. O comportamento esperado é aplicar `trim` antes de validar o tamanho mínimo e rejeitar descrições que, após normalização, fiquem abaixo de 20 caracteres.

**Caso adicional 2 - Perda de estado por navegação antes do envio.** O cliente preenche o formulário, muda de aba ou fecha o navegador sem enviar e volta depois. Sem nenhuma persistência local (por exemplo, `sessionStorage`), o cliente perde tudo e pode desistir de abrir o ticket. Para um protótipo de demonstração isso pode não ser crítico, mas para um formulário público de suporte afeta diretamente a taxa de conclusão. O comportamento esperado mínimo seria preservar os dados durante a sessão do navegador ou documentar essa limitação como decisão de escopo.

## Observação sobre o caso de envio duplicado

A IA listou "envio duplicado" como caso genérico, mas não especificou como detectar o duplicado. O caso só é testável se tiver um comportamento observável: desabilitar o botão durante o envio ou usar um identificador idempotente no payload. Sem isso, o caso fica no nível de intenção, não de teste executável.
