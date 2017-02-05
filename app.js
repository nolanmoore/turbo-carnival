var express = require('express')
var morgan = require('morgan');             // log requests to the console (express4)
// var mongoose = require('mongoose');                     // mongoose for mongodb
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
// var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var app = express()
var port = process.env.PORT || 8000;

// mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io
app.use(express.static(__dirname + '/src'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride());

app.get('/api/breweries', function(req, res) {
  var baseUrl = 'http://api.brewerydb.com/v2/search/geo/point';
  var lat = req.param('lat');
  var lng = req.param('lng');

  res.send(user_id + ' ' + token + ' ' + geo);
});

app.get('/api/tiles', function(req, res) {
  var baseUrl = 'http://api.brewerydb.com/v2/search/geo/point';
  var lat = req.param('lat');
  var lng = req.param('lng');

  res.send(user_id + ' ' + token + ' ' + geo);
});

// app.use(express.static('./src'));
app.listen(port, function () {
  console.log('Brew app listening on port ' + port)
})

// TODO respond to app request for data
