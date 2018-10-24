
/**
Creates an api module with 4 methods as the requirement

Each of these methods returns a promise which either
 - resolves with the response data
 - rejects with an error 

The api methods invoke the controllers 

**/
  mongoose = require('mongoose'),

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/usersurvey'); 
  //load created models  here
var User = require('./models/usermodel'), 
  Survey = require('./models/surveymodel'),
  UserSurvey = require('./models/usersurveymodel');

var surveys = require('./controllers/surveyListController');
var users = require('./controllers/userListController');
var usersurveys = require('./controllers/usersurveyListController');

var utils=require('./utils');

var api_impl={

    createSurvey:function(request){
    
		return surveys.create_survey(request.data)


    },
    createParticipant:function(request){
    	
 		return users.add_user(request.data)



    },
    getAvailableSurveys:function(request){
		return usersurveys.get_available_surveys(request.data.userId)

    },
    submitSurveyAnswers:function(request){
		return usersurveys.update_responses(request.data)


    }

}
module.exports=api_impl




