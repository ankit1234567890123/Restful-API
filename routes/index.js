var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var database;


router.get('/', function(req, res, next) {
	MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
		if(!err) {
			database = db;
			console.log("We are connected");
		}
		else{
			throw err;
		}
	});
	res.render('index');
});

router.get('/data', function(req, res, next) {
	console.log("in get method");
	var collection = database.collection('Nobel');
	var id = parseInt(req.query.id);
	console.log(typeof(id));
	console.log(id);
	collection.findOne({Id: id},function(err, doc) {
		if (doc){			
			console.log(doc);
			console.log(typeof(doc));
			res.json(doc)
		} 
		else {
			console.log('no data for this company');
		}
	});
});

module.exports = router;
