import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

//serve para desacoplar rotas do aqr principal do server para um outro arquivo
const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

//primeiro parâmetro rota que o usuário vai acessar
//segundo parâmetro função que vai ser executada quando o usuário acessar a rota
//request obter dados e response enviar resposta

//index se for uma listagem
//show se for exibir um unico registro
//create pra criar
//update para atualizar
//delete para deletar
routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes; 
//comando para rodar o server = yarn dev