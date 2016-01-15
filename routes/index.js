var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RMBX', expandedTitle: 'Rate My Burrito eXperience' });
});

router.post('/authenticate', function(req, res) {
  db.postgres.authenticate(function(result) {
    res.send(JSON.stringify(result));
  }, req.body.username, req.body.psswd);
});

router.post('/createAccount', function(req, res) {
  db.postgres.createAccount(function(result) {
    res.send(JSON.stringify(result));
  }, req.body.username, req.body.psswd);
});

router.post('/logExperience', function(req, res) {
  db.postgres.logExperience(function(result) {
    res.send(JSON.stringify(result));
  }, req.body);
});

module.exports = router;
