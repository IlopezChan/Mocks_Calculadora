require('dotenv').config();
let sql = require('mssql')
//Configurando la base de datos
const dbSettings = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    pool:{
        max: 1000,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        database: process.env.DATABASE,
        enableArithAbort: false,
        encrypt: false,
        trustServerCertificate: true
    }
};
async function getConnection(){
    try {
        const poolconection = new sql.ConnectionPool(dbSettings);
        const pool = await poolconection.connect();
        return pool;
    } catch (error) {
        console.log(error)
    } 
}
module.exports = {sql, getConnection};