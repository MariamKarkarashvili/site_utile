var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var path = require('path');


router.use(bodyParser.json());
/* GET home page. */

router.get('/', function(req, res, next) {
  console.log(req.query);
  res.render('admin', {qs : req.query});
});

router.post('/', urlencodedParser, function(req, res, next){
  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

})


module.exports = router;

// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
//
//
// router.use(bodyParser.json());
// /* GET home page. */
//
// router.get('/', function(req, res, next) {
//   console.log(req.query);
//   res.render('admin', {qs : req.query});
// });
//
// router.post('/', urlencodedParser, function(req, res, next){
//   console.log(req.body);
//   global.data.texte = req.body.texte;
//
//   res.redirect('/')
//
// })
//
//
// module.exports = router;
