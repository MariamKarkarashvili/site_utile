var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');
var path = require('path');

router.use(bodyParser.json());
/* GET home page. */
router.get('/', function(req, res, next) {

  fs.readFile(path.join(__dirname, '/uploads/index.html'), 'utf8', function(err, data) {
    if (err) throw err;

    res.render('index', { data: data});

  });

});



module.exports = router;
