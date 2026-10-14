# GameStock — proposta completa do projeto

## 1. Definição da ideia: tema, nicho e foco

| Elemento | Definição |
| --- | --- |
| Nome do projeto | GameStock |
| Tema | Gerenciamento de produtos |
| Nicho | Jogos físicos para consoles |
| Foco | Controle de estoque e consulta de preços em uma loja de jogos |
| Usuário principal | Funcionário responsável pelo estoque da loja |
| Tipo de registro gerenciado | Um jogo físico disponível no catálogo da loja |

Assim como uma aplicação pode ter o tema **notícias** e o foco **tecnologia**, o GameStock tem o tema **produtos** e o foco **jogos físicos para consoles**.

O GameStock será um sistema de uso interno para uma empresa que vende jogos físicos de PlayStation, Xbox e Nintendo Switch. Seu objetivo é permitir que o funcionário consulte e mantenha o catálogo da loja, acompanhando o nome de cada jogo, sua plataforma, gênero, preço e quantidade disponível.

O recorte do projeto é o estoque de jogos físicos. A compra pelo cliente acontece fora da aplicação; o funcionário utiliza o sistema para organizar os registros da loja.

## 2. Contexto da empresa

Para contextualizar a proposta, considere uma pequena loja especializada na venda de jogos físicos para consoles. Ela possui títulos de diferentes gêneros e plataformas, e seus funcionários precisam consultar a disponibilidade e atualizar as informações dos produtos durante o atendimento.

O mesmo título pode existir para plataformas diferentes. Um jogo de PlayStation 5 e sua versão para Xbox, por exemplo, devem ter registros separados, pois podem apresentar preços e quantidades diferentes.

Esse é um cenário fictício utilizado para apresentar uma necessidade profissional clara. O projeto acadêmico representará uma versão simplificada desse controle.

## 3. Problema que o sistema resolve

Quando a loja mantém informações em anotações dispersas ou depende da memória dos funcionários, fica mais difícil responder perguntas como:

- Esse jogo está disponível para qual console?
- Qual é o preço de uma unidade?
- Quantas cópias estão disponíveis?
- Quais títulos estão acabando?
- Quais jogos já ficaram sem estoque?

Também pode haver dificuldade para corrigir preços, atualizar quantidades ou remover registros cadastrados incorretamente.

O problema central é a falta de um local organizado para consultar e manter as informações dos jogos físicos da loja.

## 4. Solução proposta

O GameStock reunirá essas informações em uma interface web. O funcionário poderá visualizar os registros em uma listagem, consultar os detalhes de um jogo e utilizar formulários para cadastrar ou editar suas informações.

A aplicação também permitirá excluir um registro após uma confirmação. Cada operação apresentará mensagens claras para indicar sucesso ou orientar a correção de erros.

No computador, a listagem será apresentada em uma tabela. No celular, os registros serão organizados de maneira que as informações e os botões continuem acessíveis.

## 5. Objetivos

### Objetivo geral

Desenvolver uma aplicação web para organizar e gerenciar o estoque de jogos físicos de uma loja especializada, utilizando Next.js no front-end e uma API em Node.js com Express no back-end.

### Objetivos específicos

- Permitir o cadastro de jogos com informações relevantes para o funcionário.
- Exibir os jogos cadastrados e suas quantidades disponíveis.
- Permitir a consulta dos detalhes de um registro.
- Possibilitar a edição de preços, quantidades e demais informações.
- Permitir a exclusão de registros com confirmação.
- Validar os campos e apresentar mensagens de sucesso ou erro.
- Entregar uma interface utilizável em computador e celular.
- Integrar as operações da interface à API Express.

## 6. Quem utilizará o sistema

O usuário principal será o funcionário responsável pelo estoque ou pelo atendimento da loja.

Durante um atendimento, ele poderá consultar um jogo para informar a plataforma, o preço e a quantidade disponível. Ao receber novas cópias ou identificar uma informação incorreta, poderá editar o registro.

O projeto terá um único perfil de utilização. A proposta inicial não exige cadastro de usuários nem diferentes níveis de acesso.

## 7. Dados de cada registro

| Campo | Tipo | Finalidade | Regra proposta |
| --- | --- | --- | --- |
| ID | Número inteiro | Identificar o registro | Gerado automaticamente pela API; inteiro positivo |
| Nome | Texto | Identificar o título do jogo | Obrigatório; entre 2 e 100 caracteres |
| Plataforma | Texto selecionado | Informar o console compatível | Obrigatório; uma das opções oferecidas |
| Gênero | Texto selecionado | Classificar o jogo | Obrigatório; uma das opções oferecidas |
| Preço | Número | Informar o preço de uma cópia física | Obrigatório; maior ou igual a zero, com até duas casas decimais |
| Quantidade | Número inteiro | Informar quantas cópias estão disponíveis | Obrigatória; maior ou igual a zero |

Exemplo de um registro:

```js
{
  id: 1,
  nome: "Minecraft",
  plataforma: "Nintendo Switch",
  genero: "Aventura",
  preco: 199.90,
  quantidade: 4
}
```

O preço e a quantidade desse exemplo são fictícios, apenas para demonstração.

A plataforma poderá incluir opções como PlayStation 4, PlayStation 5, Xbox One, Xbox Series X e Nintendo Switch. O gênero poderá incluir ação, aventura, RPG, corrida, esporte, estratégia, plataforma e outros gêneros necessários ao catálogo.

## 8. Funcionalidades

### Cadastrar um jogo

O funcionário preencherá nome, plataforma, gênero, preço e quantidade. Após validar os dados, a API gerará um ID, adicionará o registro ao array e devolverá uma resposta. A interface apresentará uma mensagem de sucesso.

### Listar os jogos

A página de estoque consultará a API e mostrará os registros existentes. Cada jogo terá acesso às ações de consultar detalhes, editar e excluir.

### Consultar os detalhes

Uma página específica exibirá todas as informações do jogo escolhido. O funcionário também poderá iniciar a edição ou a exclusão a partir dessa tela.

### Editar um jogo

O formulário abrirá preenchido com os dados atuais. O funcionário poderá alterar as informações e salvar. A API atualizará o registro correspondente ao ID recebido.

### Excluir um jogo

A interface mostrará qual jogo será excluído e solicitará uma confirmação. Se o funcionário confirmar, a API removerá o registro. Se cancelar, o jogo permanecerá no estoque.

Excluir um registro significa retirá-lo do catálogo. Um jogo temporariamente indisponível pode permanecer cadastrado com quantidade zero.

### Recursos de apoio presentes no protótipo

O protótipo também apresenta busca por nome, plataforma ou gênero, resumo do estoque e indicação de disponibilidade. Esses recursos ajudam na consulta; a prioridade da entrega é concluir as quatro operações de cadastro, listagem, edição e exclusão integradas à API.

## 9. Informações calculadas na interface

A situação do estoque será calculada a partir da quantidade:

| Quantidade | Situação |
| --- | --- |
| 0 | Sem estoque |
| 1 ou 2 | Estoque baixo |
| 3 ou mais | Disponível |

Esse limite é uma regra simples escolhida para a demonstração. A situação não precisa ser preenchida nem armazenada separadamente.

A interface também poderá apresentar:

- **Jogos cadastrados:** quantidade de registros no catálogo.
- **Unidades em estoque:** soma das quantidades de todos os registros.
- **Valor do estoque:** soma do preço de cada jogo multiplicado por sua quantidade.

O valor do estoque representa o total calculado pelos preços cadastrados. Ele não representa faturamento, lucro ou custo de aquisição.

## 10. Páginas e navegação

| Página ou componente | Conteúdo e finalidade |
| --- | --- |
| Estoque de jogos | Listagem, consulta rápida e acesso às ações |
| Cadastrar jogo | Formulário para adicionar um registro |
| Detalhes do jogo | Informações completas de um registro |
| Editar jogo | Formulário preenchido para alterar informações |
| Confirmação de exclusão | Janela sobre a página para confirmar ou cancelar a remoção |

As rotas previstas para o Next.js são:

```text
/jogos                 → listagem
/jogos/novo            → cadastro
/jogos/1               → detalhes do registro de ID 1
/jogos/1/editar        → edição do registro de ID 1
```

No App Router, as páginas de detalhes e edição utilizarão uma pasta dinâmica `[id]`. Assim, a mesma página poderá exibir registros diferentes conforme o ID da URL.

A confirmação de exclusão poderá ser um modal reutilizável, sem uma página própria.

## 11. Direção visual

O visual escolhido para o protótipo utiliza fundo escuro, superfícies discretas e verde para destacar a ação principal. A proposta combina com o nicho gamer e mantém o foco na leitura das informações.

Os elementos principais serão:

- Navegação para estoque e cadastro.
- Títulos e botões com nomes claros.
- Formulário compartilhado entre cadastro e edição.
- Preços formatados em reais.
- Situações de estoque identificadas por texto e cor.
- Layout adaptado para telas menores.
- Mensagens de validação próximas dos campos.

O cadastro dependerá dos dados do jogo, sem exigir envio de imagens. O protótipo utiliza iniciais para identificar visualmente os registros.

## 12. Como Next.js e Express funcionarão juntos

O Next.js será responsável pelas páginas e pelos componentes da interface. O Express será responsável por receber as requisições, validar os dados e manipular os registros.

O fluxo será:

```text
Funcionário utiliza a interface em Next.js
                    ↓
Next.js envia uma requisição HTTP à API Express
                    ↓
API valida os dados e consulta ou altera o array
                    ↓
API devolve uma resposta em JSON
                    ↓
Next.js atualiza a tela e apresenta uma mensagem
```

Por exemplo, ao cadastrar um jogo:

1. O funcionário preenche o formulário.
2. O Next envia os dados com uma requisição `POST`.
3. O Express valida os campos recebidos.
4. A API gera o ID e adiciona o jogo ao array.
5. A API devolve o registro criado.
6. O Next mostra o resultado e atualiza a interface.

O estado do React guardará os dados necessários para mostrar a tela. A fonte dos registros da aplicação final será a API Express.

## 13. Armazenamento em memória

Conforme o enunciado do professor, a API manterá os registros em um array na memória. Não será necessário utilizar banco de dados nesta entrega.

O array poderá começar com poucos jogos de exemplo:

```js
let jogos = [
  {
    id: 1,
    nome: "Minecraft",
    plataforma: "Nintendo Switch",
    genero: "Aventura",
    preco: 199.90,
    quantidade: 4
  },
  {
    id: 2,
    nome: "Elden Ring",
    plataforma: "PlayStation 5",
    genero: "RPG",
    preco: 229.90,
    quantidade: 2
  }
];
```

Os demais registros serão adicionados pelo formulário do site. Não será necessário escrever manualmente um catálogo grande no código.

Enquanto a API permanecer em execução, o array manterá as alterações. Atualizar a página do navegador consultará novamente esse mesmo array. Reiniciar a API restaurará os dados iniciais definidos no código.

Esse comportamento atende ao recorte acadêmico pedido pelo professor. Uma utilização contínua pela empresa exigiria armazenamento persistente em uma evolução futura.

## 14. Rotas previstas para a API

| Operação | Método e rota | Resultado esperado |
| --- | --- | --- |
| Listar jogos | `GET /api/jogos` | Devolver todos os registros |
| Consultar um jogo | `GET /api/jogos/:id` | Devolver o registro do ID informado |
| Cadastrar | `POST /api/jogos` | Validar e adicionar um registro |
| Editar | `PUT /api/jogos/:id` | Validar e atualizar o registro |
| Excluir | `DELETE /api/jogos/:id` | Remover o registro |

Exemplo dos dados enviados no cadastro:

```json
{
  "nome": "Minecraft",
  "plataforma": "Nintendo Switch",
  "genero": "Aventura",
  "preco": 199.90,
  "quantidade": 4
}
```

O ID será atribuído pelo back-end. O preço deverá ser enviado como número, mesmo que o formulário mostre a vírgula utilizada na escrita brasileira.

As respostas poderão seguir a organização da API ensinada pelo professor:

```json
{
  "sucesso": true,
  "dados": {
    "id": 1,
    "nome": "Minecraft",
    "plataforma": "Nintendo Switch",
    "genero": "Aventura",
    "preco": 199.90,
    "quantidade": 4
  }
}
```

Em uma listagem, `dados` será um array. Em uma resposta de erro, poderá ser enviado `sucesso: false` junto de uma mensagem no campo `erro`.

Os códigos de resposta previstos incluem `200` para consultas, edição e exclusão com confirmação em JSON; `201` para cadastro; `400` para dados inválidos; `404` para registro inexistente; e `500` para uma falha interna inesperada.

O Next e o Express executarão em portas diferentes, por exemplo `3000` e `3001`. A integração deverá permitir a comunicação entre a origem da interface e a API.

## 15. Validações e mensagens

Os campos serão validados na interface para orientar o funcionário e também no back-end para impedir o armazenamento de dados inválidos.

Exemplos de mensagens:

- “Informe o nome do jogo.”
- “Selecione a plataforma.”
- “Informe um preço válido.”
- “A quantidade deve ser um número inteiro maior ou igual a zero.”
- “Jogo cadastrado com sucesso.”
- “Alterações salvas com sucesso.”
- “Jogo excluído do estoque.”
- “Jogo não encontrado.”
- “Não foi possível carregar os jogos. Tente novamente.”

A interface também deverá representar carregamento, estoque vazio e busca sem resultados. Uma falha na comunicação com a API deverá apresentar uma mensagem de erro, sem indicar que a operação foi concluída.

## 16. Exemplo de utilização na loja

Um funcionário consulta o catálogo e encontra quatro cópias de Minecraft para Nintendo Switch. A loja recebe mais duas cópias. Ele abre a edição, altera a quantidade de quatro para seis e salva.

Quando o preço desse jogo muda, ele edita o mesmo registro e atualiza o preço unitário. Se perceber que cadastrou um título incorretamente, pode excluir o registro após conferir a confirmação.

Se a quantidade chegar a zero, o jogo continuará cadastrado e aparecerá como “Sem estoque”. Isso permite manter suas informações para uma futura reposição.

As quantidades serão atualizadas manualmente. A aplicação não registrará pedidos ou vendas nem reduzirá o estoque automaticamente após uma compra.

## 17. Escopo da entrega

O projeto gerenciará um único tipo principal de registro: jogos físicos para consoles.

Fazem parte da proposta o cadastro, a consulta, a edição, a exclusão, a validação e a apresentação das informações de estoque.

Controle de clientes, fornecedores, pagamentos, carrinho, entregas, histórico de vendas e compra de jogos pela internet ficam fora deste recorte. Esses recursos criariam outros processos e aumentariam o tempo de desenvolvimento.

O objetivo é entregar uma solução pequena e completa, com funcionamento que possa ser explicado durante a apresentação.

## 18. Relação com os conteúdos das aulas

| Conteúdo | Aplicação no GameStock |
| --- | --- |
| App Router | Organização das páginas e rotas |
| Layout e componentes | Reutilização da navegação, formulário e confirmação |
| Propriedades dos componentes | Envio dos dados de um jogo para os elementos da interface |
| `useState` | Controle dos campos, mensagens e dados exibidos |
| `useEffect` | Consulta dos dados ao carregar uma tela, conforme a implementação |
| `fetch` | Comunicação com a API Express |
| `.map()` | Exibição da lista de registros |
| Rotas dinâmicas | Consulta e edição de um jogo pelo ID |
| Express | Recebimento das requisições e envio de respostas JSON |
| Validação | Conferência dos campos no front-end e no back-end |

A API de produtos do professor servirá como referência de organização. A versão do GameStock utilizará um array em memória e incluirá as operações necessárias para o gerenciamento completo.

## 19. Situação atual e próximos passos

Existe um protótipo visual navegável na pasta `GameStock-prototipo`. Ele demonstra as telas e simula as operações com um array no navegador. Ao atualizar a página do protótipo, os dados de exemplo são restaurados.

A implementação final deverá transformar esse visual em páginas e componentes Next.js e criar a API Express com o array no back-end.

Uma sequência de desenvolvimento possível é:

1. Definir os campos e criar os dados iniciais da API.
2. Implementar e conferir as rotas de consulta, cadastro, edição e exclusão.
3. Montar o layout, a listagem e o formulário reutilizável no Next.
4. Integrar todas as operações da interface à API.
5. Conferir validações, mensagens, registros inexistentes e layout no celular.
6. Escrever as instruções para executar o front-end e o back-end.
7. Ensaiar a demonstração e a explicação do funcionamento.

## 20. Texto para apresentar a proposta ao professor

> Meu projeto será o GameStock, um gerenciador de estoque de jogos físicos para consoles. Ele foi pensado para uma loja especializada que precisa organizar seu catálogo e consultar a disponibilidade dos jogos durante o atendimento. O usuário principal será o funcionário responsável pelo estoque. Cada registro terá nome, plataforma, gênero, preço e quantidade. O sistema permitirá cadastrar, listar, editar e excluir esses registros. A interface será desenvolvida em Next.js, com App Router e componentes reutilizáveis, e consumirá uma API em Node.js com Express. Conforme o enunciado, os dados serão mantidos em um array na memória do back-end e voltarão ao estado inicial quando a API for reiniciada.

## 21. Roteiro de demonstração

Uma apresentação de aproximadamente cinco a sete minutos pode seguir esta sequência:

1. **Problema e proposta:** explicar a necessidade da loja e o foco em jogos físicos para consoles.
2. **Listagem:** mostrar plataforma, preço, quantidade e situação do estoque.
3. **Cadastro:** adicionar um jogo e explicar a validação dos campos.
4. **Edição:** alterar o preço ou a quantidade e mostrar o resultado.
5. **Exclusão:** demonstrar a confirmação e a remoção do registro.
6. **Funcionamento técnico:** explicar que o Next envia requisições à API e que o Express manipula o array.

### Perguntas que podem surgir

**Qual é o nicho e o foco do projeto?**

O nicho é jogos físicos para consoles, e o foco é o controle de estoque de uma loja especializada.

**Por que não utilizar banco de dados?**

Porque o enunciado pede registros em um array na memória do Express. O projeto segue esse requisito.

**Onde ficam os registros?**

Na memória do processo que executa a API Express. O Next recebe esses dados para exibi-los.

**O que acontece ao atualizar a página?**

A interface consulta a API novamente. As alterações permanecem enquanto a API continuar em execução.

**O que acontece ao reiniciar a API?**

O array volta aos registros iniciais definidos no código.

**O sistema realiza vendas?**

O foco desta entrega é manter o catálogo e as quantidades. O processo de venda acontece fora da aplicação.

## 22. Conferência para a entrega

- [ ] Front-end desenvolvido em Next.js com App Router.
- [ ] API desenvolvida em Node.js com Express.
- [ ] Dados armazenados em um array no back-end.
- [ ] Cadastro funcionando pela API.
- [ ] Listagem funcionando pela API.
- [ ] Edição funcionando pela API.
- [ ] Exclusão funcionando pela API.
- [ ] Campos validados e mensagens de sucesso ou erro.
- [ ] Interface utilizável em computador e celular.
- [ ] Componentes reutilizados e código organizado.
- [ ] Instruções para iniciar os dois projetos localmente.
- [ ] Código do front-end e do back-end preparado para entrega.
- [ ] Demonstração ensaiada e funcionamento compreendido.
