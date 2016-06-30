var Promotions = require("./models/promotions");

var promotionTest = function(db, callback){
	var promotion =  {
		"name": "Weekend Grand buffet",
		"image": "images/buffet.png",
		"label": "New",
		"price": "19.99",
		"description": "Featuring . . ."
	};

	console.log("Create promotion schema");
	Promotions.create(promotion, function(err, promotion){
		if(err) throw err;

		console.log("Promotion created");
		console.log(promotion);

		var id = promotion._id;
		setTimeout(function(){
			Promotions.findByIdAndUpdate(id, {
				$set: {
					description: "Updated description"
				}
			}, {
				new: true
			})
			.exec(function(err, promotion){
				if(err) throw err;
				console.log("Updated");
				console.log(promotion);

				db.collection("promotions").drop(function(){
					callback();
				});
			});
		}, 3000);
	})
}

module.exports = promotionTest;