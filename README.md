# TP3 - Engenharia de Software Guiada por Modelos e IA

**Aluna:** Letícia Saraiva da Silva  
**Disciplina:** Engenharia de Software Guiada por Modelos e IA  
**Instituto:** INFNET  

Este repositório reúne os artefatos do TP3, que avaliou o uso de plataformas low-code de geração de aplicações a partir de linguagem natural (Vercel v0 e Lovable) na construção de um portal de autoatendimento para o Nimbus Desk, com foco em testes definidos antes da geração, comparação de plataformas e avaliação arquitetural para uso em produção.

## Estrutura do repositório

```text
tp3-nimbus-desk/
├── README.md
├── casos-teste-formulario.md
├── /casos-teste-formulario
│   └── evidencias/
├── avaliacao-cobertura.md
├── classificacao-plataformas.md
├── avaliacao-arquitetural.md
├── comparacao-escalabilidade.md
├── prototipo-painel.md
│   └── evidencias/
├── vercel-lovable-analise.md
├── integracao-banco.md
└── avaliacao-fullstack.md
```

## Links dos protótipos publicados

| Exercício | Plataforma | Link |
|-----------|------------|------|
| 1 e 2 | Vercel v0 | https://nimbus-livid-two.vercel.app |
| 3 e 4 | Lovable | https://nimbus-ticket-bloom.lovable.app |
| 6 e 7 | Lovable | https://nimbus-ticket-bloom.lovable.app |
| 9 | Lovable | https://nimbus-ticket-bloom.lovable.app |

## Relatório técnico curto

**Exercício 1.** O formulário de abertura de ticket foi gerado no Vercel v0 a partir de uma descrição textual com os campos nome, e-mail, categoria e descrição, e com as validações de obrigatoriedade, formato de e-mail e tamanho mínimo da descrição. Seguindo a lógica de TDD, os 10 casos de teste foram escritos antes da geração e registrados em `casos-teste-formulario.md`, com o resultado de execução contra o protótipo. Oito casos passaram de primeira; dois exigiram ajuste no prompt (validação de e-mail sem TLD e limite de descrição com `>` em vez de `>=`). Após o ajuste, os 10 casos passaram.

**Exercício 2.** A cobertura de testes foi aprofundada com um pedido à IA por casos de borda e de falha, e o resultado foi avaliado criticamente em `avaliacao-cobertura.md`. A IA cobriu os casos óbvios pedidos no prompt, mas não considerou dois casos relevantes para um formulário público de suporte: descrição composta apenas de espaços ou caracteres invisíveis, e perda de estado por navegação antes do envio. Ambos foram adicionados à lista com comportamento esperado e criticidade.

**Exercício 3.** O mesmo formulário foi gerado no Lovable a partir da mesma descrição textual, e os 10 casos de teste foram executados contra o segundo protótipo. A classificação em `classificacao-plataformas.md` colocou o Lovable em primeiro lugar (9 de 10 casos passaram de primeira, contra 8 de 10 do Vercel v0), justificada não só pelo número de testes mas também pelo fato de o Lovable entregar persistência real no Lovable Cloud, o que o v0 não faz por padrão.

**Exercício 4.** A avaliação arquitetural em `avaliacao-arquitetural.md` analisou o Vercel v0 quanto a controle sobre o banco de dados, integração com o backend Flask e possibilidade de auditoria do código gerado. A conclusão foi que o protótipo não deveria ir para produção como está, porque não tem persistência, não está integrado ao backend e não foi projetado para auditoria contínua. A recomendação foi usar o protótipo como referência de UI e migrar para código próprio no Flask antes do lançamento.

**Exercício 5.** A comparação em `comparacao-escalabilidade.md` contrastou a plataforma low-code com o desenvolvimento tradicional em Flask quanto à escalabilidade sob aumento de carga e à manutenção do código ao longo do tempo. A conclusão foi que o low-code é a escolha certa para protótipo e validação de mercado, e o Flask é a escolha certa para escala, porque nenhuma das dimensões de controle sobre banco, integração, auditoria e evolução de regras de negócio é bem atendida pela plataforma low-code.

**Exercício 6.** O painel de satisfação do cliente foi especificado em 12 linhas e construído no Lovable, com nota média por agente, filtro de período, seletor de agente, ordenação por nota decrescente e estado vazio. O `prototipo-painel.md` registra o que o protótipo atendeu integralmente (média por agente, ordenação, filtro, seletor, estado vazio, paleta roxa) e o que exigiu ajuste manual (recalcular a média ao mudar o filtro, destacar o agente sem filtrar a lista, exibir o estado vazio quando o filtro não retorna resultados).

**Exercício 7.** A análise em `vercel-lovable-analise.md` distinguiu quando as ferramentas são adequadas apenas para prototipagem e quando poderiam sustentar produção, com quatro critérios concretos: sensibilidade do dado exibido, necessidade de autenticação e autorização, volume esperado de usuários e de dados, e necessidade de auditoria e versionamento do código. A conclusão foi manter o painel na plataforma low-code enquanto for demonstração, e migrar para o Flask se ele passar a exibir dados reais de clientes.

**Exercício 8.** O painel foi integrado ao banco do Lovable Cloud com três tabelas (`support_agents`, `support_tickets`, `ticket_ratings`) e dados simulados de cinco agentes, vinte tickets e vinte avaliações. O `integracao-banco.md` avaliou as limitações do esquema imposto pela plataforma: tipos de dado limitados, dificuldade de expressar relacionamentos complexos e ausência de migrações versionadas, explicando como cada limitação afetaria o Nimbus Desk se o painel crescesse além de um protótipo.

**Exercício 9.** O portal de acompanhamento de ticket foi construído no Lovable com scaffolding AI-native, com uma função de serviço isolada que chama o endpoint `GET /tickets` do backend Flask do TP1 e cai em mock local consistente quando o backend não está disponível. O `avaliacao-fullstack.md` avaliou as limitações para produção (segurança do endpoint público, tratamento de erro genérico e organização do código sem testes automatizados) e concluiu com os trade-offs das ferramentas AI-native: ganho de velocidade de entrega real, mas custo arquitetural que exige migração para o backend próprio antes do lançamento.

## Evidências visuais

As capturas de tela dos protótipos funcionando estão nas pastas `evidencias/` de cada exercício. As principais são: formulário do v0 com validações disparando (Exercício 1), formulário do Lovable com erros em vermelho e confirmação de ticket (Exercício 3) e painel de satisfação com dados e estado vazio (Exercício 6).

## Observações finais

O TP mostrou que as plataformas low-code entregam velocidade de prototipagem real, mas não substituem a decisão arquitetural de um time de engenharia. O padrão que se repetiu ao longo dos exercícios foi o mesmo: a IA acelera a primeira versão, mas o custo de revisão, correção e migração é real e precisa ser considerado antes de qualquer lançamento em produção. O caminho recomendado para o Nimbus Desk é usar a geração por IA para validar a experiência do usuário e, antes de produção, migrar o código para o backend Flask com autenticação, tratamento de erro granular, testes automatizados e migrações versionadas.
