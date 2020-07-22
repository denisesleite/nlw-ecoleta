
//ARQUIVO DE CONEXAO COM O BANCO DE DADOS SQLITE
import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }, 
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }, 
    // sqlite nao suporta valores padrões na hora de inserir dados por isso da a msg de alerta no terminal, usando essa flag já resolve
    useNullAsDefault: true,
};