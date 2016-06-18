var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");

var hostname = "localhost"
var port = 3000;

var app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use("/dishes", require("./dishRouter.js"));


app.use("/promotions", require("./promotionRouter.js"));


app.use("/leadership", require("./leaderRouter.js"));

app.use(express.static(__dirname  + "/public"));

app.listen(port, hostname, function(){
	console.log("Serving running at http://" + hostname + ":" + port);
})