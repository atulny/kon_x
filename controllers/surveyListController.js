'use strict';


var mongoose = require('mongoose'),
  Survey = mongoose.model('surveys');
  var utils=require('../utils');

/*
Mongo does not have support for 'time' data type .. only datetime.

we will expect the input time in 'hh:nn am/pm' format and convert to a datetime time with date being the '1970/1/1'

Mongo stores dates as ISO .. so no conversion required

*/
 function parse_time(tm){

  var re=/^(\d+)\:(\d+)\s*([ap]m)?$/
  var arr=tm.match(re)
  if (arr){
    var h = +arr[1],m = +arr[2], ap=arr[3] ||""
    if (ap.toLowerCase()=="pm" && h<12){
        h=h+12
    }
        console.log(h,m,ap)    

    return new Date(2000,0,1,h,m,0)
  }
 }

exports.create_survey = function(survey_data) {
 
  if (survey_data.launch_time  && typeof(survey_data.launch_time)=='string'){
    var date=parse_time(survey_data.launch_time)
    var date0=utils.trunc_date(new Date(+date))
    var offset=(+date) - (+date0)
    console.log(survey_data.launch_time,offset,date,date0)    

    survey_data.launch_time = offset

  }
  if (survey_data.due_time  && typeof(survey_data.due_time)=='string'){
     var date=parse_time(survey_data.due_time)
    var date0=utils.trunc_date(new Date(+date))
    var offset=(+date) - (+date0)
        console.log(survey_data.due_time,offset,date,date0)    

    survey_data.due_time = offset

  }
 
  var new_survey = new Survey(survey_data);
  return new_survey.save( );
};


 

/**
//Not required

exports.update_survey = function(req, res) {
  Survey.findOneAndUpdate({_id: req.params.surveyId}, req.body, {new: true}, function(err, survey) {
    if (err)
      res.send(err);
    res.json(survey);
  });
};
exports.delete_survey = function(req, res) {


  Survey.remove({
    _id: req.params.surveyId
  }, function(err, survey) {
    if (err)
      res.send(err);
    res.json({ message: 'survey successfully deleted' });
  });
};
**/