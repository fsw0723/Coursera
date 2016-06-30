var mongoose = require("mongoose");
	assert = require("assert");

var Dishes = require("./models/dishes-1");

var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
	console.log("Connected correctly to server");
	var newDish = {
		name: "Pizza",
		description: "Description1"
	};

	Dishes.create(newDish, function(err, dish){
		if(err) throw err;

		console.log("Dish created");
		console.log(dish);

		var id = dish._id;
		setTimeout(function(){
			Dishes.findByIdAndUpdate(id, {
				$set: {
					description: "Updated description"
				}
			}, {
				new: true
			})
			.exec(function(err, dish){
				if(err) throw err;
				console.log("Updated");
				console.log(dish);

				db.collection("dishes").drop(function(){
					db.close();
				});
			});
		}, 3000);
	})

});