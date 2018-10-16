'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  user_id: {
    type: String,
    required: 'Enter the ID of the User'
  },
  
  timezone: {
    type: String,
   default: "America/New_York"
  }
});

module.exports = mongoose.model('users', UserSchema);