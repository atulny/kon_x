'use strict';


var mongoose = require('mongoose'),
  Usersurvey = mongoose.model('usersurveys');

exports.list_usersurveys = function(req, res) {
  Usersurvey.find({}, function(err, usersurvey) {
    if (err)
      res.send(err);
    res.json(usersurvey);
  });
};




exports.create_usersurvey = function(req, res) {
  var new_usersurvey = new Task(req.body);
  new_usersurvey.save(function(err, usersurvey) {
    if (err)
      res.send(err);
    res.json(usersurvey);
  });
};


exports.read_usersurvey = function(req, res) {
  Task.findById(req.params.usersurveyId, function(err, usersurvey) {
    if (err)
      res.send(err);
    res.json(usersurvey);
  });
};


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