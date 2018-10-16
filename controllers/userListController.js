'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('users');

exports.list_all_tasks = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_user = function(req, res) {
  Task.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_user = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};
exports.delete_user = function(req, res) {


  Task.remove({
    _id: req.params.userId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};