var mongoClient = require("mongodb").MongoClient,
	assert = require("assert");

var dboper = require("./operation");
var url = "mongodb://localhost:27017/conFusion";

mongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	console.log("Connected");

	dboper.insertDocument(db, {
		name: "Vadonut", 
		description: "description1"},
		"dishes",
		function(result){
			console.log(result.ops);
			dboper.findDocuments(db, "dishes", function(docs){
				console.log(docs);
				dboper.updateDocument(db, 
					{name: "Vadonut"},
					{description: "new description"},
					"dishes", function(result){
						console.log(result.result);

						dboper.findDocuments(db, "dishes", function(docs){
							console.log(docs);

							db.dropCollection("dishes", function(result){
								console.log(result);
								db.close();
							});
						});
					});
			});
		});
});