# Casos de Teste do Formulário de Abertura de Ticket

## Contexto

Os casos de teste foram definidos antes da geração do protótipo, seguindo a lógica de TDD: os testes funcionam como especificação executável e o assistente de IA recebe um alvo claro. O formulário tem os campos nome, e-mail, categoria do problema e descrição.

## Casos de teste definidos antes da geração

**CT01 - Todos os campos vazios.** Submeter o formulário sem preencher nada deve exibir erro em nome, e-mail, categoria e descrição, e não deve permitir o envio.

**CT02 - Nome vazio com demais campos válidos.** Apenas o campo nome deve gerar erro específico; os demais permanecem válidos.

**CT03 - E-mail vazio.** O campo e-mail deve gerar erro de obrigatoriedade.

**CT04 - E-mail com formato inválido.** Valores como `usuario`, `usuario@`, `@dominio.com` e `usuario@dominio` devem ser rejeitados com mensagem de formato inválido.

**CT05 - E-mail com formato válido.** `cliente@exemplo.com` deve ser aceito sem erro.

**CT06 - Categoria não selecionada.** O formulário deve exigir a escolha de uma categoria válida entre "Problema técnico", "Cobrança", "Dúvida" e "Sugestão".

**CT07 - Descrição com menos de 20 caracteres.** Deve ser rejeitada com mensagem indicando o tamanho mínimo.

**CT08 - Descrição com exatamente 20 caracteres.** Deve ser aceita, porque o limite é mínimo inclusivo.

**CT09 - Descrição com mais de 20 caracteres válidos.** Deve ser aceita e o formulário deve permitir o envio.

**CT10 - Envio com todos os campos válidos.** O formulário deve exibir confirmação de abertura do ticket.

## Prompt usado no Vercel v0

"Crie um formulário de abertura de ticket para clientes do Nimbus Desk. Os campos são: nome (texto, obrigatório), e-mail (texto, obrigatório, formato de e-mail válido), categoria do problema (select com as opções 'Problema técnico', 'Cobrança', 'Dúvida' e 'Sugestão', obrigatório) e descrição (textarea, obrigatório, mínimo de 20 caracteres). O formulário deve validar todos os campos no cliente antes do envio, exibir mensagens de erro claras por campo e, em caso de sucesso, mostrar uma confirmação de que o ticket foi aberto. Use React com Tailwind e componentes shadcn/ui. Não gere backend; apenas o formulário com validação e estado de confirmação."

## Registro de execução contra o protótipo gerado

| Caso | Resultado | Observação |
|------|-----------|------------|
| CT01 | Passou de primeira | Erros exibidos nos quatro campos |
| CT02 | Passou de primeira | Erro apenas no campo nome |
| CT03 | Passou de primeira | Erro de obrigatoriedade no e-mail |
| CT04 | Exigiu ajuste no prompt | A validação inicial aceitava `usuario@dominio` sem TLD. Ajuste solicitado: exigir ponto no domínio e mensagem específica abaixo do campo |
| CT05 | Passou de primeira | E-mail válido aceito |
| CT06 | Passou de primeira | Categoria obrigatória com select |
| CT07 | Passou de primeira | Descrição curta rejeitada com mensagem de mínimo |
| CT08 | Exigiu ajuste no prompt | A validação inicial usava `> 20` em vez de `>= 20`. Ajuste solicitado: aceitar exatamente 20 caracteres |
| CT09 | Passou de primeira | Descrição longa aceita |
| CT10 | Passou de primeira | Confirmação exibida após envio |

**Resumo:** 8 de 10 casos passaram de primeira. Os dois ajustes foram feitos no prompt (validação de e-mail e limite inclusivo da descrição), sem necessidade de reescrever o protótipo do zero.

## Links e artefatos

- Protótipo publicado: https://nimbus-livid-two.vercel.app
- Código exportado: /casos-teste-formulario
- Evidências visuais: as capturas de tela do formulário funcionando e das validações estão na pasta `evidencias/` do repositório.

## Evidências visuais

As três capturas de tela anexadas ao repositório mostram: (1) o formulário vazio com as validações disparando ao tentar enviar, (2) o formulário com e-mail inválido e descrição curta exibindo as mensagens de erro por campo, e (3) o formulário preenchido corretamente com a confirmação de abertura do ticket exibida após o envio.
