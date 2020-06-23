# ECOLETA

Projeto desenvolvido na semana Next Level Week da RocketSeat chamado Ecoleta. Este projeto foi desenvolvido pensando no meio ambiente, com a finalidade de descartar os resíduos de forma correta, permitindo criar pontos de coleta onde é informado sua localização, o endereço e o tipo de resíduo a ser coletado. Também é permitido fazer busca de um ponto específico de coleta, assim como buscar pontos por filtro, e listar os ítens cadastrados. 

Nesta aplicação foi usado as seguintes tecnologias:

<li>ReactJS: Biblioteca JavaScript de código aberto com foco em criar interfaces de usuário em páginas web.</li>
<li>Typescript: Conjunto do JS com recursos mais avançados.</li>
<li>NodeJS: Ambiente de execução js server-side(ao lado do servidor).</li>
<li>React Native: Bibioteca Javascript usada para desenvolver aplicativos para sistemas Android e IOS de forma nativa.</li>
<li>SQLite3: Biblioteca que implementa um banco de dados SQL embutido, podendo ter acesso a DB SQL sem executar um processo SGBD separado.</li>
<li>Express: microframework para lidar com rotas dentro de uma aplicação.</li>
<li>SPA: Single Page Aplication, não recarrega, apenas atualiza o conteúdo da página.</li>
<li>Insomnia/Postman: Programa pra testar rotas do back-end de uma aplicação.</li>
<li>Knex.js: Biblioteca para trabalhar com bancos de dados SQL com linguagem javascript.</li>
<li>CORS: Define na API quais url web vão ter acesso a ela.</li>
<li>Leaflet: API de mapas para cadastro de cadastro de pontos.</li>
<li>Axios: Biblioteca que permite requisições para o backend NodeJs (API REST).</li>
<li>Expo: Ferramenta utilizada no desenvolvimento mobile com React Native que permite o fácil acesso às API’s.</li>

Para funcionalidade da aplicação deve-se instalar a última versão do Node.js e rodar os seguintes comandos:

### BACK-END
#### Instalando dependências
$ npm install

#### Criar as migrations do banco SQLite
$ npx knex migrate:latest

#### Executar seeds
$ npx knex seed:run

#### Iniciar servidor 
$ yarn dev

#### Porta 3333

-------------------------------

### FRONT-END

#### Instalando dependências
$ npm install

#### Iniciar Projeto
$ npm start

#### Porta 3000

### MOBILE

#### Iniciar Projeto
npm start

