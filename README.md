# ECOLETA

Projeto desenvolvido na semana Next Level Week da RocketSeat chamado Ecoleta. Este projeto foi desenvolvido pensando no meio ambiente, com a finalidade de descartar os resíduos de forma correta, permitindo criar pontos de coleta onde é informado sua localização, o endereço e o tipo de resíduo a ser coletado. Também é permitido fazer busca de um ponto específico de coleta, assim como buscar pontos por filtro, e listar os ítens cadastrados. 

Nesta aplicação foi usado as seguintes tecnologias:

<li><b>ReactJS:</b> Biblioteca JavaScript de código aberto com foco em criar interfaces de usuário em páginas web.</li>
<li><b>Typescript:</b> Conjunto do JS com recursos mais avançados.</li>
<li><b>NodeJS:</b> Ambiente de execução js server-side(ao lado do servidor).</li>
<li><b>React Native:</b> Bibioteca Javascript usada para desenvolver aplicativos para sistemas Android e IOS de forma nativa.</li>
<li><b>SQLite3:</b> Biblioteca que implementa um banco de dados SQL embutido, podendo ter acesso a DB SQL sem executar um processo SGBD separado.</li>
<li><b>Express:</b> microframework para lidar com rotas dentro de uma aplicação.</li>
<li><b>SPA:</b> Single Page Aplication, não recarrega, apenas atualiza o conteúdo da página.</li>
<li><b>Insomnia/Postman:</b> Programa pra testar rotas do back-end de uma aplicação.</li>
<li><b>Knex.js:</b> Biblioteca para trabalhar com bancos de dados SQL com linguagem javascript.</li>
<li><b>CORS:</b> Define na API quais url web vão ter acesso a ela.</li>
<li><b>Leaflet:</b> API de mapas para cadastro de cadastro de pontos.</li>
<li><b>Axios:</b> Biblioteca que permite requisições para o backend NodeJs (API REST).</li>
<li><b>Expo:</b> Ferramenta utilizada no desenvolvimento mobile com React Native que permite o fácil acesso às API’s.</li>

Para funcionalidade da aplicação deve-se instalar a última versão do Node.js e rodar os seguintes comandos:

### BACK-END
#### Instalar dependências
$ npm install

#### Criar as migrations do banco SQLite
$ npx knex migrate:latest

#### Executar seeds
$ npx knex seed:run

#### Iniciar servidor 
$ yarn dev

ou

$ npm run dev

-------------------------------

### FRONT-END

#### Instalando dependências
$ npm install

#### Iniciar Projeto
$ npm start

#### Porta 3000

------------------------------

### MOBILE

#### Instalando dependências
$ npm install

#### Iniciar Projeto
$ npm start

ou

$ expo start

Recomendável instalar o Expo no seu smartphone e escanear o QRcode para ver a aplicação funcionando.

