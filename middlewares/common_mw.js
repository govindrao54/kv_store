/*
 * @Author: govindrao54
 * @Date:   2018-06-30 02:03:02
 * @Last Modified by:   govindrao54
 * @Last Modified time: 2018-07-01 03:52:48
 */

var middleware = {};
var _ = require('lodash');

middleware.entry = function(req, res, next) {
    log.debug('mw - entry');
    // add the request options to the req.locals
    req.locals = _.extend({}, req.query, req.body, req.params);
    // request can be audited here
    return next();
}

middleware.exit = (req, res, next) => {
    log.debug('mw - exit');
    // final step
    return res.send(req.locals.res_data || 'done!');
}

middleware.rv_error_handler = (err, req, res, next) => {
    log.debug('mw - rv_error_handler');
    // If it's not a Joi error, sent to app error handler
    if (!err.isJoi) return next(err);
    // Only show Joi innermost message from the error array
    const innerMessage = err.details[0].message;
    res.status(400).json({
        status: 'error',
        message: innerMessage
    });
}

middleware.global_error_handler = (err, req, res, next) => {
    log.debug('mw - global_error_handler');
    res.status(500).json({
        status: 'error',
        message: err.message
    });
}

middleware._404_handler = (req, res, next) => {
    log.debug('mw - _404_handler');

    res.status(404);

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
}

module.exports = middleware;