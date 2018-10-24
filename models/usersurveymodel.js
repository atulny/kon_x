'use strict';
var mongoose = require('mongoose');

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
  status: {
       type: String,
      enum: ['pending', 'submitted'],
        default: 'pending'
   },
  submitted_on: {
    type: Date,
    default:Date.now
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

module.exports = mongoose.model('usersurveys', UserSurveySchema);