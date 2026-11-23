# Avaliação Arquitetural da Plataforma Low-Code

## Plataforma avaliada

Vercel v0, escolhida como melhor no Exercício 3 com base no número de casos de teste que passaram de primeira.

## Controle sobre o banco de dados

O Vercel v0 é uma ferramenta de geração de interface, não um banco de dados gerenciado. O protótipo do Exercício 1 não persiste dados: o formulário valida e exibe confirmação, mas não grava o ticket em lugar nenhum. Para o Nimbus Desk, isso significa que o v0 não oferece controle sobre o banco de dados porque não oferece banco nenhum. A persistência teria que ser adicionada manualmente, conectando o formulário a uma API externa, o que descaracteriza o uso da ferramenta como solução completa e a reduz a um gerador de front-end. O controle sobre o schema, os tipos e as migrações fica inteiramente fora da plataforma.

## Integração com o backend existente em Flask

O formulário gerado pelo v0 é um componente React que pode ser integrado ao backend Flask existente por meio de uma chamada `fetch` para o endpoint de abertura de ticket. A integração é tecnicamente viável, mas exige intervenção manual: o código gerado não conhece a API do Nimbus Desk, não sabe o formato do payload esperado, não trata os erros retornados pelo Flask e não lida com autenticação. Na prática, a integração transforma o protótipo em um projeto de front-end que precisa ser mantido separadamente do restante do Nimbus Desk, com risco de divergência entre o que o formulário valida no cliente e o que o backend valida no servidor.

## Possibilidade de auditar o código gerado

O v0 permite exportar o código gerado, o que viabiliza a auditoria. O código é React com Tailwind e componentes shadcn/ui, legível e organizado em componentes. A auditoria é possível, mas trabalhosa: o código gerado tende a ser verboso e a usar padrões da biblioteca de componentes que não são os do Nimbus Desk. Não há garantia de que o código exportado seja estável entre gerações, o que significa que uma nova geração pode produzir um código diferente para a mesma descrição, dificultando o controle de versão e a revisão.

## Recomendação

O Nimbus Desk não deveria colocar essa versão em produção como está. O protótipo do v0 é adequado para validar a experiência do formulário e demonstrar a funcionalidade, mas não tem persistência, não está integrado ao backend Flask e não foi projetado para auditoria contínua. A recomendação é usar o protótipo como referência de UI e de validação de campos, e migrar para código próprio dentro do backend Flask antes do lançamento, aproveitando a especificação de validação já testada nos Exercícios 1 e 2.
