var Leadership = require("./models/leadership");

var leadershipTest = function(db){
	var leadership =  {
		"name": "Peter Pan",
		"image": "images/alberto.png",
		"designation": "Chief Epicurious Officer",
		"abbr": "CEO",
		"description": "Our CEO, Peter, . . ."
	};

	console.log("Create leadership schema");
	Leadership.create(leadership, function(err, leadership){
		if(err) throw err;

		console.log("leadership created");
		console.log(leadership);

		var id = leadership._id;
		setTimeout(function(){
			Leadership.findByIdAndUpdate(id, {
				$set: {
					description: "Updated description"
				}
			}, {
				new: true
			})
			.exec(function(err, leadership){
				if(err) throw err;
				console.log("Updated");
				console.log(leadership);

				db.collection("leaderships").drop(function(){
					db.close();
				});
			});
		}, 3000);
	})
}

module.exports = leadershipTest;