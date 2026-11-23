# Classificação das Plataformas

## Metodologia

O mesmo formulário de abertura de ticket foi gerado em duas plataformas low-code a partir da mesma descrição textual. Os mesmos 10 casos de teste dos Exercícios 1 e 2 foram executados contra os dois protótipos, e a classificação abaixo se baseia no número de casos que passaram em cada plataforma.

## Links dos protótipos

- Vercel v0: https://nimbus-livid-two.vercel.app
- Lovable: https://nimbus-ticket-bloom.lovable.app

## Resultados por plataforma

**Vercel v0:** 8 de 10 casos passaram de primeira. Os dois que exigiram ajuste foram CT04 (validação de e-mail aceitava domínio sem TLD) e CT08 (limite de descrição usava `> 20` em vez de `>= 20`). Após um segundo prompt, os 10 casos passaram.

**Lovable:** 9 de 10 casos passaram de primeira. O caso que exigiu ajuste foi CT08 (limite de descrição), corrigido com um prompt adicional. O Lovable também entregou persistência real no Lovable Cloud (tabela `support_tickets`), com isolamento entre visitantes, o que o v0 não faz por padrão. Após o ajuste, os 10 casos passaram.

## Classificação

**Primeiro lugar: Lovable.** Justificativa: passou 9 de 10 casos de primeira contra 8 de 10 do Vercel v0, e o único ajuste necessário foi o mesmo tipo de correção de limite inclusivo que o v0 também exigiu. Além disso, o Lovable entregou uma aplicação completa com banco de dados funcional e isolamento entre visitantes, o que reduz o trabalho manual de integração que o v0 deixaria para o time.

**Segundo lugar: Vercel v0.** Justificativa: passou 8 de 10 casos de primeira, com dois ajustes de prompt, e entregou apenas o front-end sem persistência. Para o escopo estrito deste exercício, que é o formulário com validação, o v0 é mais direto e fácil de inspecionar, mas a ausência de banco significa que o time teria que integrar manualmente ao backend Flask.

## Observação qualitativa

A diferença de um caso entre as duas plataformas não é grande o suficiente para declarar superioridade técnica absoluta. A escolha do Lovable como primeiro lugar se sustenta menos pelo número de testes e mais pelo fato de ele entregar uma aplicação com persistência real, o que aproxima o protótipo de um uso mais próximo do real. O v0 continua sendo mais adequado quando o objetivo é apenas validar a interface sem se comprometer com banco de dados.

## Evidências visuais

As capturas de tela do Lovable mostram o formulário com a paleta roxa, os erros de validação em vermelho nos campos, a tela de confirmação com o número do ticket e o registro salvo na tabela `support_tickets` do Lovable Cloud. As capturas do Vercel v0 estão no arquivo do Exercício 1.
