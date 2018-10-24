'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('users');
var moment = require('moment-timezone')

const participantduration=7*10 //10 weeks
 

 
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
exports.add_user = function(data) {
   //validate the timezone
  // set the curated timezone
  //   else set an error message and return
  var tz_obj=validate_timezone(data.timezone)
  if (tz_obj.error){
    var errors={
        "timezone":tz_obj.error
      }
    
      return Promise.reject(errors)
  }
  data.timezone=tz_obj.timezone
  if (!data.date_created){
    data.date_created=new Date()
  }
  data.date_end=new Date(+data.date_created+(participantduration*24*60*60*1000))
  var new_user = new User(data);
  return new_user.save( );
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