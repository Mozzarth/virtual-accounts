import { CONFIG } from '../../common/config/config';
import { SqlConnection } from './IConnection';
import mysql from 'mysql2/promise'

class ConnectionMySql implements SqlConnection {

    private readonly connectionPool: mysql.Pool;

    constructor() {
        const configConn: mysql.PoolOptions = {
            connectionLimit: 15, // Determina el limite de conexiones
            queueLimit: 50, // Determina el limite de conexiones en cola antes de mandar un error
            waitForConnections: true, // Permite conexiones en cola
            // timezone: '-5000', // zona horaria
            // insecureAuth: true, // Permitir la conexión a instancias de MySQL que soliciten el método de autenticación antiguo
            host: CONFIG.DB_HOST,
            user: CONFIG.DB_USER,
            password: CONFIG.DB_PASS,
            port: Number(CONFIG.DB_PORT),
            database: CONFIG.DB_DATABASE,
        };
        this.connectionPool = mysql.createPool(configConn);
        this.registerEvents();
    }
    public async getConnection() {
        return this.connectionPool.getConnection();
    }
    public close(): void {
        // Deberia de ser una promesa
        // cierra todas las conexiones del pool
        this.connectionPool.end();
    }

    private registerEvents() {
        this.connectionPool.on('acquire', function (connection) {
            //console.log('Connection %d acquired || Conexion Adquirida', connection.threadId);
        });
        this.connectionPool.on('enqueue', function () {
            //console.log('Waiting for available connection slot || Esperando por una conexión');
        });
        this.connectionPool.on('connection', function (connection) {
            // connection.query('SET SESSION auto_increment_increment=1')
            //console.log("New connection established  || Nueva conexión establecida")
        });

        this.connectionPool.on('release', function (connection) {
            //console.log('Connection %d released || conexión liberada', connection.threadId);
        });
    }
}

const connectionMySql = new ConnectionMySql()
export { connectionMySql }