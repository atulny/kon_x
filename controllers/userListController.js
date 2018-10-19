'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('users');
var moment = require('moment-timezone')



exports.list_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


function validate_timezone(origtimezone){
  var result={timezone:null,error:""}
  try{  
    var timezone=moment.tz.zone(origtimezone)
    if (timezone &&  timezone.name){
      result.timezone=timezone.name
    }
    else{
      result.error="invalid timezone:"+origtimezone
    }     
  } catch (e){
    result.error=e.toString()
    
  }   
   
  return result
}

exports.create_user = function(req, res) {
  
  var new_user = new User(req.body);
   
  //validate the timezone
  // set the curated timezone
  //   else set an error message and return
  var tz_obj=validate_timezone(new_user.timezone)
  if (tz_obj.error){
    var errors={
        "timezone":tz_obj.error
      }
      res.send({    "message": "timezone validation failed: timezone: provide valid timezone",
        errors:errors});
      new_user.errors=errors
      res.json(new_user);
      return
  }
  new_user.timezone=tz_obj.timezone
  
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.read_user = function(req, res) {
  User.findOne({user_id:req.params.userId}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

/*
//Not available
-----------------------------------------------------
exports.update_user = function(req, res) {
  User.findOneAndUpdate({user_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};
exports.delete_user = function(req, res) {


  User.remove({
    user_id:req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};
*/