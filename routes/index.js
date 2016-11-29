var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var database;


router.get('/', function(req, res, next) {
	MongoClient.connect("mongodb://ankit:ankit@ds113678.mlab.com:13678/heroku_1kt0jn7x", function(err, db) {
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
	var collection = database.collection('Nobel');
	var id = parseInt(req.query.id);
	collection.findOne({Id: id},function(err, doc) {
		if (doc){			
			res.json(doc)
		} 
		else {
			console.log('no data found');
		}
	});
});

module.exports = router;
