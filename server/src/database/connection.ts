//CRIANDO CONEXÃO DA APLICAÇÃO

// O Knex é usado como um construtor de consultas SQL no Node.JS
import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        //qual arquivo vamos armazenar o arquivo do BD
        //dirname diretório do arquivo que está executando ele
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    //ativa flag pra saber se o item existe antes de cadastrar
    pool: {
        afterCreate: (conn: any, cb: any) =>
        conn.run('PRAGMA foreign_keys = ON', cb)
    },
    // suporta valores padrões na hora de inserir dados por isso da a msg de alerta no terminal, usando essa flag já resolve
    useNullAsDefault: true,
});

export default connection;

//Migrations = Histórico do banco de dados
