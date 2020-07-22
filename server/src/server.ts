//Express lida com rotas, ajuda a interpretar o caminho da aplicação e retornar a execução de tarefas baseada no que foi solicitado
//Quando vier com '...' utilizando TS, as bibliotecas precisam vim com código da biblioteca e definição de tipos da biblioteca, alguns momentos precisa instalar definição de tipos adicional
//comando npx no terminal serve para executar o pacote que instalamos
import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(cors());

// o Use serve para colocar um plugin dentro do express colocando uma funcionalidade a mais dentro dele, essa é a forma do express entender o formato json dentro dele
app.use(express.json());
app.use(routes);

//static - servir arquivos estáticos de uma pasta específica
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors()); //retorna erros

//Rota: Endereço completo da requisição
//Recurso: Qual entidade estamos acessando do sistema

//GET: Busca uma ou mais informações do back-end
//POST: Cria uma nova informação no back-end
//PUT: Atualizar uma informação existente no back-end
//DELETE: Deletar uma informação existe no back-end

//POST http://localhost:3333/users = Criar um usuário
//GET http://localhost:3333/users = Listar usuário
//GET http://localhost:3333/users/5 = Buscar dados do usuário com ID 5

//Request Param: Parâmetros que vem na própria rota que identificam um recurso
//Query Param: Parâmetros que vem na própria rota geralmente opcionais para filtros, paginação.
//Request Body: Parâmetros para criação e atualização de informações

//DB
//Select * from users WHERE name = "Denise" ------ SQL NORMAL
//knex('users').where('name','Denise').select('*'); ----------- KNEX em formato JS

// const users = ([
//     "Denise",
//     "Julia",
//     "Isabela",
//     "Rose"
// ]);

//Query param quem determina o nome do parâmetro é quem ta fazendo a requisição

// app.get('/users', (request: any, response: any) => {
//     const search = String(request.query.search);

//     //se existe a informação de user ele verifica se o user inclui dentro do texto dele o search, se não fica a lista de user normal
//     const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

//     //se não tiver o return e haver mais códigos abaixo ele vai continuar executando
//     return response.json(filteredUsers);
// });

// //Request params /:id damos o nome do parâmetro na própria rota
// app.get('/users/:id', (request: any, response: any) => {
//     const id = Number(request.params.id);

//     const user = users[id];

//     return response.json(user);
// });

// app.post('/users', (request:any ,response:any) =>{
//     const data = request.body;

//     const user = {
//         name: data.name,
//         email: data.email,
//     };

//     //se não tiver o return e haver mais códigos abaixo ele vai continuar executando
//     return response.json(user);
// });

app.listen(3333);
