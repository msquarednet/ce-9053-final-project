var express = require("express");
var authorize = require("../middleware/middleware").authorize;
var Thing = require("../models/models").Thing;

var thingsRouter = express.Router();

//  "/api/things"

//selectAll
thingsRouter.get("/", function(req,res,next) {
  Thing.find({}).sort("name").exec(function(err,things) {
    if (err) { res.status(500).send(err); } //console.log(err);
    res.send(things);  //console.log(things);
  });
});
//select
thingsRouter.get("/:_id", function(req,res,next) {
  Thing.findOne({_id: req.params._id}, function(err,thing) {
    if (err) { res.status(500).send(err); } //console.log(err);
    res.send(thing);  //console.log(thing);
  });
});
//insert
thingsRouter.post("/", function(req,res,next) {
  Thing.create(req.body, function(err,thing) {
    if (err) { res.status(500).send(err); } //console.log(err);
    res.send(thing);  //console.log(thing);
  });
});
//update
thingsRouter.put("/:_id", function(req,res,next) {
  Thing.findByIdAndUpdate(req.params._id, req.body, function(err,thing) {
    if (err) { res.status(500).send(err); } //console.log(err);
    res.send(thing);  //console.log(thing);
  });
});  
//delete
thingsRouter.delete("/:_id", function(req,res,next) {
  Thing.findByIdAndRemove(req.params._id, function(err,thing) {
    if (err) { res.status(500).send(err); } //console.log(err);
    res.send(thing);  //console.log(thing);
  });
});  




// thingsRouter.get("/", function(req, res){
//   Thing.find({}).sort("name").exec(function(err, things){
//     res.send(things);
//   }); 
// });

// thingsRouter.get("/:_id", function(req, res){
//   Thing.findById(req.params._id).exec(function(err, thing){
//     res.send(thing);
//   }); 
// });

// thingsRouter.post("/:token", authorize, function(req, res){
//   Thing.create(req.body, function(err, thing){
//     if(err){
//       res.status(500).send(err); 
//     }else{
//       res.send(thing); 
//     }
//   });
// });

// thingsRouter.post("/:_id/:token", authorize, function(req, res){
//   //Thing.update({ _id: req.params._id } , { name: req.body.name, color: req.body.color, active: req.body.active }, function(err, result){
//   Thing.findByIdAndUpdate(req.params._id, req.body, function(err, result){
//     if (err){
//       res.status(500).send(err); 
//     } else {
//       res.send(result); 
//     }
//   });
// });
  
// thingsRouter.delete("/:_id/:token", authorize, function(req, res){
//   Thing.remove({_id: req.params._id}).exec(function(){
//     res.send({deleted: true});
//   });
// });

module.exports = thingsRouter;





