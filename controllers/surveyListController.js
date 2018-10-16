'use strict';


var mongoose = require('mongoose'),
  Survey = mongoose.model('surveys');

exports.list_tasks = function(req, res) {
  Survey.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_task = function(req, res) {
  var new_survey = new Survey(req.body);
  new_survey.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_task = function(req, res) {
  Survey.findById(req.params.surveyId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_task = function(req, res) {
  Survey.findOneAndUpdate({_id: req.params.surveyId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.delete_task = function(req, res) {


  Task.remove({
    _id: req.params.surveyId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};