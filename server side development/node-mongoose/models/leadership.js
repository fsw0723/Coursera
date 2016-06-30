var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var leadershipSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	label: {
		type: String,
		default: ""
	},
	abbr: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

var Leadership = mongoose.model("Leadership", leadershipSchema);
module.exports = Leadership;