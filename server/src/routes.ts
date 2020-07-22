import express from 'express';
import { celebrate, Joi } from 'celebrate'; //celebrate é integração com o Joi e express para validação

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

//serve para desacoplar rotas do aqr principal do server para um outro arquivo
const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

//ts-node-dev transpila o código TypeScript para JavaScript, transforma o TS em JS e executa usando o próprio Node.
//--transpileOnlydirá para ele apenas transpilar, sem fazer a verificação de tipo. Essa verificação pode ser feita no editor, apontando os erros diretamente em nosso código.

//primeiro parâmetro rota que o usuário vai acessar
//segundo parâmetro função que vai ser executada quando o usuário acessar a rota
//request obter dados e response enviar resposta

//index se for uma listagem
//show se for exibir um unico registro
//create pra criar
//update para atualizar
//delete para deletar
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
  '/points',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  pointsController.create
);

export default routes;
//comando para rodar o server = yarn dev
