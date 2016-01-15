var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RMBX', expandedTitle: 'Rate My Burrito eXperience' });
});

router.post('/authenticate', function(req, res) {
  res.render('index', { title: 'RMBX', expandedTitle: 'Authenticate Page' });
});

router.post('/createAccount', function(req, res) {

});

router.post('/logExperience', function(req, res) {

});

module.exports = router;
