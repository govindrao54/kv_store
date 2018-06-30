/*
 * @Author: govindrao54
 * @Date:   2018-06-30 02:03:02
 * @Last Modified by:   govindrao54
 * @Last Modified time: 2018-07-01 03:52:40
 */

const PORT = 3000;

var express = require('express');
var winston = require('winston');

global.log = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({
            filename: 'combined.log',
            level: 'debug',
            format: winston.format.json()
        })
    ]
});

global.knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'kv_store'
    },
    pool: { min: 0, max: 7 }
});

// create express app and register all the routes and the error handlers
var app = express();
require('./register_routes.js')(app);

app.listen(PORT, function() {
    console.log("<<< Test Server: Key Value Store running on port - ", PORT, '>>>');
});