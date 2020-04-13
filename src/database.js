const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('LA CONEXIÓN CON LA BASE DE DATOS FUE CERRADA');
        }
    
    }

    if (connection) connection.release();
    console.log('BASE DE DATOS CONECTADA');
    return;
});
//CONVERTIR PROMESAS
pool.query = promisify(pool.query);
module.exports = pool;