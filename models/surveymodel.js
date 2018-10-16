'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SurveyQuestionAnswesrSchema = new Schema({
      seqno:{
          type:int
      },
      answer: {
        type: String,
        required: 'Enter the question'
      }
})
var SurveyQuestionSchema = new Schema({
  seqno:{
    type:int
  },

 question: {
    type: String,
    required: 'Enter the question'
  },
  answers:[SurveyQuestionAnswesrSchema]

})


var SurveySchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the schema'
  },
  
  launch_time: {
    type: Date
  },
  due_time: {
    type: Date
  },
   frequency: {
    type: [{
      type: String,
      enum: ['daily', 'weekly']
    }],
    default: ['daily']
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  questions:[SurveyQuestionSchema]
});

module.exports = mongoose.model('surveys', SurveySchema);