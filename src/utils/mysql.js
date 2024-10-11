const mysql = require('mysql')
const dotenv = require('dotenv');
dotenv.config(); // Cargar variables de entorno desde el archivo .env

//Crea un Pool de Conexiones con un Limite de 5
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})


//Funcion para recibir las peticiones SQL, acceder a la BD y Ejecutarlas
const query = (sql, params) => {
    return new Promise ((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, params, (err, rows) => {
                if (err) {
                    connection.release();
                    reject(err);
                    return;
                }
                connection.release();
                resolve(rows);
            });
        });
    });
}

module.exports = {
    query
}