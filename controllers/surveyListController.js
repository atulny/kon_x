'use strict';


var mongoose = require('mongoose'),
  Survey = mongoose.model('surveys');
/*
Mongo does not have support for 'time' data type .. only datetime.

we will expect the input time in 'hh:nn am/pm' format and convert to a datetime time with date being the '1970/1/1'

Mongo stores dates as ISO .. so no conversion required

*/
exports.list_surveys = function(req, res) {
  Survey.find({}, function(err, survey) {
    if (err)
      res.send(err);
    res.json(survey);
  });
};




exports.create_survey = function(req, res) {
  var survey_data=req.body
  if (survey_data.questions && typeof(survey_data.questions)=='string'){

    survey_data.questions=JSON.parse(survey_data.questions)
  }
  if (survey_data.launch_time){
    survey_data.launch_time = new Date( "1970/1/1 "+  survey_data.launch_time)

  }
  if (survey_data.due_time){
    survey_data.due_time = new Date( "1970/1/1 "+  survey_data.due_time)

  }
 
  var new_survey = new Survey(survey_data);
  new_survey.save(function(err, survey) {
    if (err)
      res.send(err);
    res.json(survey);
  });
};


exports.read_survey = function(req, res) {
  Survey.findById(req.params.surveyId, function(err, survey) {
    if (err)
      res.send(err);
    res.json(survey);
  });
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