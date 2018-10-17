'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveyAnswesrSchema = new Schema({
      seqno:{
          type:Number
      },
      answer: {
        type: Number
      }
})
var UserSurveySchema = new Schema({
  user_id: {
    type: String,
    required: 'ID of the User'
  },
 survey_id: {
    type: String,
    required: 'ID of the Survey'
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'submitted']
    }],
    default: ['pending']
  },
  submitted_on: {
    type: Date
  },
  responses: [SurveyAnswesrSchema]
});

module.exports = mongoose.model('usersurveys', UserSurveySchema);