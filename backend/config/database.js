import mysql from 'mysql2/promise';

export function criarPool() {
    return mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME,
        waitForConnections: true, //Permite fila, se estiver False, as 11º conexão retorna erro 
        connectionLimit: 10, //limite máximo de conexões simultâneas
        queueLimit: 0 // Limite da fila do waitForConnections, quando estiver 0 a fila é infinita
    })
}