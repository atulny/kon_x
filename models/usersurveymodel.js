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
    required: 'Enter the ID of the User'
  },
 survey_id: {
    type: String,
    required: 'Enter the ID of the User'
  },
  submitted_on: {
    type: Date
  },
  responses: [SurveyAnswesrSchema]
});

module.exports = mongoose.model('usersurveys', UserSurveySchema);