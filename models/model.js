'use strict'

const mysql = require('mysql'),
    config = require('./config'),
    dbOptions = {
        host : config.mysql.host,
        user : config.mysql.user,
        password : config.mysql.password,
        port : config.mysql.port,
        connectionLimit : 10,
        database : config.mysql.database,
        ssl: config.mysql.ssl
    },
    pool = mysql.createPool(dbOptions)

pool.getConnection( (err)=>{
    return (err)
        ?console.log(`Error al conectar a Mysql : ${err.starck}`)
        :console.log(`Conexion establecida con Mysql`)
})

module.exports = pool