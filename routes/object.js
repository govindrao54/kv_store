/*
 * @Author: govindrao54
 * @Date:   2018-06-30 02:03:02
 * @Last Modified by:   govindrao54
 * @Last Modified time: 2018-07-01 03:52:42
 */

var router = require('express').Router();
var mw = require('../middlewares/common_mw.js');
var obj = require('../controllers/object.js');

// define all the object routes
router.get('/:key', obj.validate.get, mw.entry, obj.get, mw.exit);
router.post('/:key', obj.validate.post, mw.entry, obj.post, mw.exit);

module.exports = router;