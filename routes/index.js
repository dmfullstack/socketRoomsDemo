var express = require('express');
var router = express.Router();

var indexCtrlr = require('../app/controllers/indexCtrlr');
var roomsCtrlr = require('../app/controllers/roomsCtrlr');

/* GET home page. */
router.get('/', indexCtrlr.home);
router.post('/room/message', roomsCtrlr.postMessage);

module.exports = router;
