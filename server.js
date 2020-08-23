var express = require('express');
var monk = require('monk');
var db = monk('mongodb/nodetest1');
var basicAuth = require('basic-auth-connect'),
var app = express();

app.use(express.static('/mnt/storage/www'));

app.get('/database/getData', basicAuth(process.env.API_USER, process.env.API_PASSWORD), function (req, res) {
  // var db = req.db;
  var collection = db.get('logscollection');
  collection.find({},{},function(error, docs){
    if (!error) {
      res.json(docs);
    } else {
      res.status(500).json(error);
    }  
  })
})
  
app.post('/database/postData', basicAuth(process.env.API_USER, process.env.API_PASSWORD), function (req, res) {
  // var db = req.db;
  var collection = db.get('logscollection');
  collection.insert(JSON.parse(req.body), function (error, doc) {
    if (!error) {
      res.json(doc);
    } else {
      res.status(500).json(error);
    }
  })
})


app.listen(8080, '0.0.0.0', function() {
  console.log("server started");
})
