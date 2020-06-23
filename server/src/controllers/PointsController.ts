// import {Request, Response} from 'express';
import knex from '../database/connection';

class PointController {
    async index(request: any, response: any) {
        //quando lida com filtros pega sempre do query params
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        //filtro dos pontos 
        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        return response.json(points);
     }

    async show(request: any, response: any) {
        //desestruturação
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        //se nao tiver encontrado nenhum ponto
        if(!point){
            return response.status(400).json({ message: "Point not found"});
        }

        /**
         * SELECT * FROM items
         * JOIN point_items ON items.id = point_items.item_id
         * WHERE point_items.point_id = { id }
         * Retorna todos os itens que estão relacionados com o ponto acima
         */

        //listar todos os items que tem relação com o ponto de coleta
        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id);

        return response.json(point);
    }

    async create(request: any, response: any) {
        //desestruturação
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        //Isto abaixo é a mesma coisa que a cima porém acima está na forma desestruturada do JS
        // const name = request.body.name;
        // const email = request.body.email;
    
        //trx se essa segunda jquery falhar a primeira não vai executar
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        });

        try {
            //relacionamento com a tabela point_items
            await trx('point_items').insert(pointItems)
      
            await trx.commit();
          } catch (error) {
            await trx.rollback();
      
            return response.status(400).json({ message: 'Falha na inserção na tabela point_items, verifique se os items informados são válidos' })
          }
      
          //spreedOperator pega todas as informações dentro de um objeto e retornar dentro de outro
          return response.json({ id: point_id, ...point, })
    }
}

export default PointController;