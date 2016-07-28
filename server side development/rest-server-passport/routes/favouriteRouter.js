var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');
var Favourites = require('../models/favourites');
var Verify = require("./verify");
var ObjectId = require('mongoose').Types.ObjectId; 

var favouriteRouter = express.Router();
favouriteRouter.use(bodyParser.json());

favouriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favourites.find({})
    .populate("postedBy")
    .populate("dishes")
    .exec(function (err, favourite) {
        if (err) throw err;
        res.json(favourite);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favourites.find({"postedBy": new ObjectId(req.decoded._id)}, function(err, favourites){
        if(err) throw err;
        if(favourites.length > 0){
            var favourite = favourites[0];
            favourite.dishes.push(req.body.dishId);
            favourite.save(function(err, favourite){
                if(err) throw err;
                console.log("New favourite saved!");
                res.json(favourite);
            });
        } else {
            req.body.postedBy = req.decoded._id;
            req.body.dishes = [new ObjectId(req.body.dishId)];
            Favourites.create(req.body, function (err, favourite) {
                if (err) throw err;
                console.log('Favourite created!');
                console.log(favourite);
                res.json(favourite);
                
            });
        }
    });
})
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Favourites.find({"postedBy": new ObjectId(req.decoded._id)}).remove(function(err, resp){
        if(err) throw err;
        res.json(resp);
    });
});

favouriteRouter.route("/:dishId")
.all(Verify.verifyOrdinaryUser)
.delete(function(req, res, next){
    console.log("delete");
    Favourites.find({"postedBy": new ObjectId(req.decoded._id)}, function(err, favourites){
        if(err) throw err;
        if(favourites.length > 0){
            var favourite = favourites[0];
            function removeA(arr){
                var what, a= arguments, L= a.length, ax;
                while(L> 1 && arr.length){
                    what= a[--L];
                    while((ax= arr.indexOf(what))!= -1){
                        arr.splice(ax, 1);
                    }
                }
                return arr;
            }
            removeA(favourite.dishes, req.params.dishId);
            favourite.save(function(err, favourite){
                if(err) throw err;
                console.log("Favourite removed!");
                res.json(favourite);
            });
        }
    });
});

module.exports = favouriteRouter;