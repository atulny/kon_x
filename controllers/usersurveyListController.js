'use strict';


var mongoose = require('mongoose'),
utils=require('../utils'),
  Usersurvey = mongoose.model('usersurveys');
 var User = mongoose.model('users');
 var Survey = mongoose.model('surveys');
var utils=require('../utils');
//Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);

 async function ensure_user_surveys(user,targetdate){
    var   usersurveys= await get_user_surveys(user) 
    var surveys_active= await   Survey.find({}) 
    var st=user.date_created||new Date(2018,9,1)
    var end=targetdate||user.date_end||new Date()
    var active_week=0
    var surveys=[]
    var running_date=st 
    //console.log(usersurveys)

    if (!usersurveys){usersurveys=[]}
    while (running_date <= end){
        var survey_date= utils.trunc_date(new Date(+running_date))

        //increment by day
        running_date.setDate(running_date.getDate()+1)
        
        //for each survey
        for (let survey of surveys_active) {
           
          var survey_id=survey.survey_id||survey.name
          var surv=usersurveys.find((it)=>it.survey_id==survey_id && (survey_date >= it.start && survey_date < it.end)  )
          if (!surv){
              surv=surveys.find((it)=>it.survey_id==survey_id && (survey_date >= it.start && survey_date < it.end)  )
          }
          if (!surv){  
            var launch_time=new Date((+survey_date) + survey.launch_time)
            var due_time = new Date((+survey_date) + survey.due_time)
            var dateend = new Date(+survey_date)
            if (survey.frequency == "weekly" ){
              dateend.setDate(dateend.getDate()+6)
              dateend = Math.min(dateend,end)
              dateend = new Date(+dateend)
            }
            dateend.setHours(23)
            dateend.setMinutes(59)
             surv={
              survey_id:survey_id,
              status:"pending",
              start:survey_date  ,
              end:dateend,
              launch_time:launch_time,
              due_time:due_time,
              responses:survey.questions.map((it)=>{return {seqno:it.seqno,answer:null}})
            }
            
          }  
        if (surveys.indexOf(surv)==-1){
            surveys.push(surv)  
        }
        
    }
  }
  
  var tocreate=surveys.filter((it)=>!it._id)
  if (tocreate && tocreate.length){
     
      for (let survey of tocreate) {
        survey.idx=user.surveys.length
        user.surveys.push(survey);
 
       }
       await user.save( ); 
    usersurveys= await get_user_surveys(user)
  }

  if (targetdate){
      usersurveys = usersurveys.filter((it)=>{
          return (targetdate >= it.start && targetdate < it.end)
          
      })

  }
  return usersurveys
  }
  async function get_user_surveys(user_id){
   //get user info
       var user=await get_user(user_id)

    return user.surveys
    
  };
 function get_user(user_id){
   //get user info
   if (user_id && typeof(user_id) == "object" && user_id.user_id){
      return Promise.resolve(user_id)
   }
    return  User.findOne( { user_id: user_id }).exec()
     
    
  };
 
function update_responses_(user,data){

  var survey_id=data.surveyId
  var responses=data.responses
  var targetdate=new Date()
  return get_available_surveys(user,targetdate).then(
    function(usersurvey) {
      var survey=usersurvey.find((it)=>it.survey_id==survey_id)
      if (survey){
        survey.responses=survey.responses||[]
           for (let response of responses) {
            if (response.seqno){
              var surveyresponse=survey.responses.find((it)=>it.seqno==response.seqno)
               if (surveyresponse){
                 surveyresponse.answer=response.answer
                } else{
                  
                  survey.responses=survey.responses.append({"seqno":response.seqno,answer:response.answer})
                }
              }
              
           }    
          survey.status="submitted"
          survey.submitted_on=new Date()
              user.surveys[survey.idx]=survey
          return user.save( ).then((user)=>user.surveys[survey.idx])
      }
      return survey
    }) 
  }    


function update_responses(data){

  return get_user(data.userId)
    .then(
      (user)=>update_responses_(user,data)
    )
}
function get_all_survey(user_id,targetdatetime){
  return  get_user( user_id)
    .then(
      (user)=>ensure_user_surveys(user,targetdatetime)
      )
    }
function get_available_surveys(user_id,targetdatetime){ 
  if (!targetdatetime){
    targetdatetime=new Date()
  }
  var result=  get_user( user_id).then(
    function(user){
        return get_all_survey(user,targetdatetime).then(
            function(allsurveys){ 
              var targetdatetimez = utils.date_for_timezone(targetdatetime,user.timezone)
              //targetdatetimez.setMinutes(0)
              var filtered = allsurveys.filter(
                    (it)=>{
                      if (it.status=="pending" ){
                        var launch_time=utils.date_for_timezone(it.launch_time,user.timezone) 
                        var due_time=utils.date_for_timezone(it.due_time,user.timezone) 
                        /*
                        console.log(launch_time,due_time,targetdatetimez,targetdatetime,(targetdatetimez.getHours() > launch_time.getHours() ||
                            (targetdatetimez.getHours() == launch_time.getHours() && targetdatetimez.getMinutes() >= launch_time.getMinutes())),
                          (targetdatetimez.getHours() < due_time.getHours() ||
                              (targetdatetimez.getHours()==due_time.getHours() && targetdatetimez.getMinutes() <= due_time.getMinutes()))
                            )
                        */
                        if (utils.isin_time(targetdatetimez,launch_time, due_time)){
                           return true
                        }
                    }
            } )
            return Array.from(filtered)  
        
       }) 
  }) 
  
  return result
}    
exports.get_available_surveys = get_available_surveys
exports.update_responses = update_responses
 
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