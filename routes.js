var express = require('express');
var pjson = require('./package.json');

var router = express.Router();

/* GET API info. */
router.get('/', function(req, res, next) {
    res.end('Welcome to the web API for this card game ' +pjson.version);
});

/* Not found, for every other route */
router.all('*', function(req, res) {res.status(404).send({ error: {"code":"404", "name":'Resource not found'}});});

module.exports = router;

