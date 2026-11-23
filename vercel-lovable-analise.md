# Análise de Adequação: Vercel v0 e Lovable

## Quando as ferramentas são adequadas apenas para prototipagem rápida

O Vercel v0 e o Lovable são adequados para prototipagem quando a funcionalidade é majoritariamente de interface, os dados são descartáveis ou simulados e não há exigência de autenticação ou de integração com o backend existente. O painel de satisfação do Exercício 6 é um exemplo claro: ele exibe dados agregados, não permite escrita, não lida com dados pessoais e não precisa de autenticação para a demonstração. Nesse cenário, a velocidade de geração compensa a falta de controle sobre o código e sobre o banco.

## Quando as ferramentas poderiam sustentar uma funcionalidade de produção

Elas poderiam sustentar produção quando a funcionalidade é bem delimitada, o volume de usuários é baixo, a autenticação é delegada a um provedor externo confiável e os dados exibidos não são sensíveis. O Lovable, por exemplo, oferece banco no Lovable Cloud com isolamento entre visitantes, o que viabiliza uma funcionalidade de leitura pública com dados não sensíveis. O v0, por ser apenas front-end, só sustentaria produção se integrado a um backend próprio que concentrasse autenticação, autorização e persistência.

## Critérios concretos para decidir entre manter na ferramenta ou migrar para o backend próprio

**Critério 1: Sensibilidade do dado exibido.** Se a funcionalidade exibe dados pessoais, notas individuais de clientes ou qualquer informação que exija controle de acesso por linha, a migração para o backend Flask é obrigatória, porque a plataforma low-code não oferece controle granular de autorização compatível com o que o Nimbus Desk já tem.

**Critério 2: Necessidade de autenticação e autorização.** Se a funcionalidade exige que apenas determinados perfis acessem determinados dados, a plataforma low-code não é adequada. O backend Flask já tem o modelo de usuários e permissões do Nimbus Desk, e replicar isso na ferramenta low-code criaria uma segunda fonte de verdade.

**Critério 3: Volume esperado de usuários e de dados.** Se o volume de acessos simultâneos ou o volume de dados crescer além do que o plano da plataforma suporta, a migração é necessária. O backend Flask permite dimensionar a aplicação conforme a carga, enquanto a plataforma low-code fica limitada às cotas contratadas.

**Critério 4: Necessidade de auditoria e versionamento do código.** Se a funcionalidade precisa ser auditada, versionada e evoluída com controle de mudanças, a plataforma low-code não é adequada porque o código é um artefato da ferramenta e não do time. O backend Flask permite revisão de código, testes automatizados e controle de versão.

## Conclusão

Para o painel de satisfação do Exercício 6, a resposta é manter na plataforma low-code enquanto for demonstração para investidores, porque os dados são simulados e o volume é baixo. Se o painel for para produção e passar a exibir dados reais de clientes, a migração para o backend Flask é necessária, porque os critérios 1, 2 e 4 deixam de ser atendidos pela plataforma.
