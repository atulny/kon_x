var api = require('./api')
  
//api.getAvailableSurveys({userId:'tom'}).then(function(d){ console.log(d) })
	 
api.submitSurveyAnswers({userId:'tom',surveyId:'dauly',responses:[{seqno:1,answer:"xxxx"}]}).then( function(d){ console.log(d) })
	 