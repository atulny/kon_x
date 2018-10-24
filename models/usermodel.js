'use strict';
var mongoose = require('mongoose');
//var  UserSurvey = require('./usersurveymodel');

var Schema = mongoose.Schema;
var SurveyAnswesrSchema = new Schema({
      seqno:{
          type:Number
      },
      answer: {
        type: String
      }
}) 
var UserSurveySchema = new Schema({
   
 survey_id: {
    type: String,
    required: 'ID of the Survey'
  },
  idx:{type:Number},
  status: {
       type: String,
      enum: ['pending', 'submitted'],
        default: 'pending'
   },
  submitted_on: {
    type: Date 
  },start: {
    type: Date 
  },end: {
    type: Date 
  },launch_time: {
    type: Date 
  },due_time: {
    type: Date 
  },
  responses: [SurveyAnswesrSchema]
});
var UserSchema = new Schema({
  user_id: {
    type: String,
    required: 'Enter the ID of the User'
  },
   date_created: {
   	type: Date,
    default: Date.now
   },
   date_end: {
   	type: Date,
   },
  timezone: {
    type: String,
   default: "America/New_York"
  },
  surveys:[UserSurveySchema]
}); 
 
module.exports = mongoose.model('users', UserSchema);