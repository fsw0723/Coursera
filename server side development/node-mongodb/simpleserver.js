var mongoClient = require("mongodb").MongoClient,
	assert = require("assert");

var url = "mongodb://localhost:27017/conFusion";

mongoClient.connect(url, function(err, db){
	assert.equal(err, null);
	console.log("Connected correctly to server");

	var collection = db.collection("dishes");

	collection.insertOne({name: "dish1", description: "description1"},
		function(err, result){
			assert.equal(err, null);
			console.log("After insert");
			console.log(result.ops);

			collection.find({}).toArray(function(err, docs){
				assert.equal(err, null);
				console.log("Found: ", docs);

				db.dropCollection("dishes", function(err, result){
					assert.equal(err, null);
					db.close();
				});
			});
		})
});