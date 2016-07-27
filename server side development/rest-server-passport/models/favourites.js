var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var favouriteSchema = new Schema({
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	dishes: [{ 
	    type: Schema.ObjectId, 
	    ref: 'Dish' 
	}]
}, {
	timestamps: true
});


var Favourites = mongoose.model("Favourite", favouriteSchema);
module.exports = Favourites;