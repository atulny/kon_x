'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SurveyQuestionAnswesrSchema = new Schema({
      seqno:{
          type:Number
      },
      answer: {
        type: String,
        required: 'Enter the question'
      }
})
var SurveyQuestionSchema = new Schema({
  seqno:{
    type:Number
  },

 question: {
    type: String,
    required: 'Enter the question'
  },
  answers:[SurveyQuestionAnswesrSchema]

})
/*
Mongo does not have support for 'time' type .. only datetime.

we will expect the input time in 'hh:nn am/pm' format and convert to a datetime time with date being the '1970/1/1'

*/

var SurveySchema = new Schema({
  survey_id: {
    type: String,
    required: 'Enter the name of the SurveyS'
  },
  
  launch_time: {
    type: Number 
  },
  due_time: {
    type: Number 
  },
   frequency: {
      type: String,
          default: 'daily' // or weekly

  }, 
  questions:[SurveyQuestionSchema]
});

module.exports = mongoose.model('surveys', SurveySchema);