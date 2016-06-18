var express = require("express");
var bodyParser = require("body-parser");

/**Leader Router**/
var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter.route("/")
.all(function(req, res, next){
	res.writeHead(200, {"Content-Type": "text/plain"});
	next();
})
.get(function(req, res, next){
	res.end("List all leaders!");
})
.post(function(req, res, next){
	res.end("Will add leader: " + req.body.name + " with introduction: " + req.body.introduction);
})
.delete(function(req, res, next){
	res.end("Remove all leaders");
});

leaderRouter.route("/:userId")
.all(function(req, res, next){
	res.writeHead(200, {"Content-Type": "text/plain"});
	next();
})
.get(function(req, res, next){
	res.end("Will send details of the leader: " + req.params.userId + " to you!");
})
.put(function(req, res, next){
	res.write("Updating the leader: " + req.params.userId + "\n");
	res.end("Will update the leader: " + req.body.name + " with introduction: " + req.body.introduction);
})
.delete(function(req, res, next){
	res.end("Deleting leader: " + req.params.userId);
});

module.exports = leaderRouter;