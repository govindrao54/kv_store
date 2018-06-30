/*
 * @Author: govindrao54
 * @Date:   2018-06-30 02:03:02
 * @Last Modified by:   govindrao54
 * @Last Modified time: 2018-07-01 03:52:49
 */

var object = {};
var MAX_OBJECT_SIZE_IN_MB = 5;

const { ValidationSchema, RequestValidation } = require('request-validation');
// Pass Joi to joi-add (so we don't further have to)
const Joi = require('joi-add')();

var sizeof = require('object-sizeof');
var uuid = require('uuid');
var moment = require('moment');

// all object schemas
object.schema = new ValidationSchema({
    params: {
        'key': Joi.string().min(1).max(40).label('key')
    },
    // timestamp in seconds
    query: {
        'timestamp': Joi.date().timestamp('unix').options({ 'convert': true }).raw().label('timestamp')
    },
    body: {
        'object': Joi.object().label('object')
    }
});

// all request validations
object.validate = new RequestValidation({
    'get': object.schema
        .use('params').presence('required')
        .use('query').presence('optional'),
    'post': object.schema
        .use('params').presence('required')
        .use('body').presence('required')
});

object.get = function(req, res, next) {
    log.debug('object controller - get');
    // select query
    var Q = knex('store')
        .select('*')
        .where({
            'key': req.locals.key,
        });

    var _created_ts = moment(req.locals.timestamp * 1000).format('YYYY-MM-DD hh:mm:ss');

    // timestamp is optional
    if (req.locals.timestamp) {
        Q = Q.andWhere('created_ts', '<=', _created_ts)
    }
    // return entry which is lastest upto this timestamp
    Q = Q.orderBy('created_ts', 'desc').limit(1);
    // execute
    Q.then((res1) => {
            req.locals.res_data = res1;
            return next();
        })
        .catch((err1) => {
            log.error('error in get - ', err1);
            return next(err1);
        })
}

object.post = function(req, res, next) {
    log.debug('object controller - post');

    // if object is > 5mb then use streams to save the data
    if (sizeof(req.body.object) > MAX_OBJECT_SIZE_IN_MB * 1024 * 1024) {
        var _e = new Error('object size should be less than 5mb!');
        _e.statusCode = 400;
        return next(_e);
    }

    // insert query
    var _uuid = uuid.v4();
    knex('store')
        .insert({
            'uuid': _uuid,
            'key': req.locals.key,
            'data': JSON.stringify(req.locals.object)
        })
        .then((res1) => {
            req.locals.res_data = [{
                'uuid': _uuid
            }];
            return next();
        })
        .catch((err1) => {
            log.error('error in post - ', err1);
            return next(err1);
        })
}

module.exports = object;