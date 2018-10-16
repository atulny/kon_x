'use strict';


var mongoose = require('mongoose'),
  Survey = mongoose.model('surveys');

exports.list_surveys = function(req, res) {
  Survey.find({}, function(err, survey) {
    if (err)
      res.send(err);
    res.json(survey);
  });
};




exports.create_survey = function(req, res) {
  var new_survey = new Survey(req.body);
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