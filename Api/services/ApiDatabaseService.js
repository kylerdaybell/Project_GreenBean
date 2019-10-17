
require('dotenv').config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_DATA = process.env.DB_DATA;
//require('iconv-lite').encodingExists('foo')

var mysql = require('mysql2/promise');

var ApiDatabaseService = {
    GetUser: async function(email){
        const con = await this.getConnection();
        var [rows] = await con.execute('select * from USER WHERE EMAIL = ?', [email]);
        return rows;
    },
    getConnection: async function(){
        const con = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASS,
            database: DB_DATA
        });
        return con;
    }
}

module.exports = ApiDatabaseService;
