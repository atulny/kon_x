'use strict';


var mongoose = require('mongoose'),
  Usersurvey = mongoose.model('usersurveys');
 var User = mongoose.model('users');
 var Survey = mongoose.model('surveys');

 function get_active_surveys_for_user(user){
  var usertime=moment(new Date()).tz(user.timezone)
  //get the current user surveys ( already saved )
  Usersurvey.find({user_id:user.user_id}, function(err, usersurveys) {
    return usersurveys
  }).then(
      function(usersurveys){
         //get all active surveys
         return Survey.find({}, function(err, usersurvey) {
            var av_surveys=[]
            for (let survey of surveys) {
                var launch_time=moment(survey.launch_time).tz(user.timezone)
                var hourdiff=launch_time.getHours()-usertime.getHours()
                if (hourdiff>0 || (hourdiff==0 && launch_time.getMinutes()>usertime.getMinutes())){
                    var due_time=moment(survey.due_time).tz(user.timezone)
                    var hourdiff2=due_time.getHours()-usertime.getHours()
                    if (hourdiff2>0 || (hourdiff2==0 && due_time.getMinutes()>usertime.getMinutes())){
                      av_surveys.push(survey)

                    } 

                }

            }
          return av_surveys
        })
  }).then(
     function(available_surveys){


     }
     
  )

 }
function get_all_survey(user_id){
   //get user info
   User.findOne({user_id:user_id}, function(err, user) {
    if (!err){
      //get time in users timezone
      var usertime=moment(new Date()).tz(user.timezone)
      var av_surveys=[]
      get_active_surveys_for_user(user_id).then(
        function(surveys){
          for (let survey of surveys) {
              var launch_time=moment(survey.launch_time).tz(user.timezone)
              var hourdiff=launch_time.getHours()-usertime.getHours()
              if (hourdiff>0 || (hourdiff==0 && launch_time.getMinutes()>usertime.getMinutes())){
                var due_time=moment(survey.due_time).tz(user.timezone)
                var hourdiff2=due_time.getHours()-usertime.getHours()
                if (hourdiff2>0 || (hourdiff2==0 && due_time.getMinutes()>usertime.getMinutes())){
                  av_surveys.push(survey)

                } 

              }

          }
        }

      )


    }
      
    
  });
   

}
exports.list_usersurveys = function(req, res) {
  Usersurvey.find({}, function(err, usersurvey) {
    if (err)
      res.send(err);
    res.json(usersurvey);
  });
};




exports.create_usersurvey = function(req, res) {
  var survey_data=req.body
  console.log(survey_data)
  if (survey_data.responses && typeof(survey_data.responses)=='string'){

    survey_data.responses=JSON.parse(survey_data.responses)
  }
  //survey_data.user_id=req.params.userId
  var new_usersurvey = new Usersurvey(survey_data);
  new_usersurvey.save(function(err, usersurvey) {
    if (err)
      res.send(err);
    res.json(usersurvey);
  });
};


exports.read_usersurvey = function(req, res) {
  Usersurvey.findById(req.params.usersurveyId, function(err, usersurvey) {
    if (err)
      res.send(err);
    res.json(usersurvey);
  });
};

/*
//Not available
-----------------------------------------------------
exports.update_usersurvey = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.usersurveyId}, req.body, {new: true}, function(err, usersurvey) {
    if (err)
      res.send(err);
    res.json(usersurvey);
  });
};
exports.delete_usersurvey = function(req, res) {


  Task.remove({
    _id: req.params.usersurveyId
  }, function(err, usersurvey) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
*/