/*
 * @Author: govindrao54
 * @Date:   2018-06-30 02:03:02
 * @Last Modified by:   govindrao54
 * @Last Modified time: 2018-07-03 10:28:56
 */

const rv = require('request-validation');
const mw = require('./middlewares/common_mw.js');
const helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// do this just once
const baseJoi = require('joi');
require('joi-add')(baseJoi);

module.exports = function(app) {
    // register all the routes in this file

    rv.options({
        headers: { stripUnknown: false },
        defaults: { presence: 'required' },
        body: { presence: 'optional' },
        params: { allowUnknown: false }
    });

    // basic security
    app.use(helmet());

    // parsing the req.body and cookies
    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '5mb'
    }));
    app.use(cookieParser());

    // object routes
    app.use('/object', require('./routes/object.js'));

    // request validation error handler
    rv.handler(mw.rv_error_handler);

    // 404
    app.use(mw._404_handler);

    // global error handler
    app.use(mw.global_error_handler);

}