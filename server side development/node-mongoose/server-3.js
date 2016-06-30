var mongoose = require("mongoose");
	assert = require("assert");

var dishTest = require("./dish-test");
var promotionTest = require("./promotion-test");
var leadershipTest = require("./leadership-test");

var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
	console.log("Connected correctly to server");
	dishTest(db, function(){
		promotionTest(db, function(){
			leadershipTest(db);
		});
	});
});