# Comparação de Escalabilidade: Low-Code versus Desenvolvimento Tradicional em Flask

## Escalabilidade sob aumento de carga de usuários

O desenvolvimento tradicional em Flask já praticado no Nimbus Desk permite controlar o dimensionamento da aplicação, o pooling de conexões com o banco, o cache, a fila de processamento e a distribuição de carga entre instâncias. A escalabilidade é uma decisão de arquitetura, não uma limitação da ferramenta. Já a plataforma low-code usada no protótipo, no caso o Vercel v0, gera um front-end estático que escala bem para servir a interface, mas não resolve a escalabilidade do backend. Se o formulário for conectado a uma API externa, a escalabilidade depende inteiramente dessa API. Se for usado o backend fornecido pela plataforma, como no caso do Lovable com Supabase, a escalabilidade fica limitada ao plano contratado e às cotas de uso, sem controle sobre índices, particionamento ou replicação.

## Manutenção do código ao longo do tempo

No desenvolvimento tradicional em Flask, o código é versionado no repositório do Nimbus Desk, segue os padrões do time, tem testes automatizados e pode ser refatorado com segurança. A manutenção é previsível porque o time conhece o código e controla as dependências. No low-code, o código gerado é um artefato da ferramenta, não do time. A depuração é mais difícil porque o código tende a ser verboso e a usar padrões da biblioteca de componentes, e a evolução de regras de negócio exige regenerar ou editar manualmente o código, com risco de perder alterações anteriores. Testar também é mais difícil: o protótipo do v0 não tem suíte de testes automatizados, e os testes dos Exercícios 1 e 2 foram executados manualmente.

## Facilidade de depurar, testar e evoluir regras de negócio

Depurar no Flask é direto: o time tem acesso ao log, ao debugger e ao fluxo completo da requisição. No low-code, a depuração fica limitada ao que a plataforma expõe, e erros de validação no cliente podem mascarar erros no servidor. Testar no Flask é automatizável com pytest e integrado ao pipeline. No low-code, os testes são majoritariamente manuais, como foi feito nos Exercícios 1 e 2. Evoluir regras de negócio no Flask é uma alteração de código versionada. No low-code, é uma nova rodada de geração ou uma edição manual que pode conflitar com o que a ferramenta gerou antes.

## Recomendação por estágio do produto

Para **protótipo**, o low-code é a escolha certa: permite validar a ideia em horas, sem comprometer tempo de engenharia, e foi exatamente o que os Exercícios 1 e 3 mostraram. Para **validação de mercado**, o low-code ainda é útil para iterar rápido na interface e testar hipóteses com usuários reais, desde que os dados sejam tratados como descartáveis e a integração com o backend seja mínima. Para **escala**, o desenvolvimento tradicional em Flask é a escolha certa: o time precisa de controle sobre o banco, a integração, a auditoria e a evolução das regras de negócio, e nenhuma dessas dimensões é bem atendida pela plataforma low-code usada nos protótipos.
