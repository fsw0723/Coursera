var Dishes = require("./models/dishes-3");

var dishTest = function(db, callback){
	var newDish =  {
		"name": "Uthapizza3",
		"image": "images/uthapizza.png",
		"category": "mains",
		"label": "Hot",
		"price": "4.99",
		"description": "A unique . . .",
		"comments": [
	        {
	          "rating": 5,
	          "comment": "Imagine all the eatables, living in conFusion!",
	          "author": "John Lemon"
	        },
	        {
	          "rating": 4,
	          "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
	          "author": "Paul McVites"
	        }
	    ]
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

				dish.comments.push({
					rating: 5,
					comment: "new comment",
					author: "Rose"
				});

				dish.save(function(err, dish){
					console.log("Updated comments!");
					console.log(dish);
					db.collection("dishes").drop(function(){
						callback();
					});
				});
			});
		}, 3000);
	})
}

module.exports = dishTest;