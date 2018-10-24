
/**
Creates an api module with 4 methods as pervthe requirement

Each of these methods returns a promise which either
 - resolves with the response data
 - rejects with an error 

The api methods invoke the api in the implementation layer

**/

  //load created models  here

var api = require('./api_impl');


var utils=require('./utils');

var appapi={

    createSurvey:function(data){
    	//survey name
    	//questions
    	//   seqno
    	//	 questions
    	//		answers
    	//		  seqno
    	//		  answer 							
    	//fequency
    	//launch time 
    	//due time
		var request=utils.wrap_request(data)
		//validate request

		return utils.wrap_response(api.createSurvey(request))


    },
    createParticipant:function(data){
    	//user_id
    	//timezone
		var request=utils.wrap_request(data)
		//validate request
        
		return utils.wrap_response(api.createParticipant(request))



    },
    getAvailableSurveys:function(data){
    	//user_id
		var request=utils.wrap_request(data)
		//validate request

		return utils.wrap_response(api.getAvailableSurveys(request))

    },
    submitSurveyAnswers:function(data){
    	//user_id
    	//survey_id  / survey_name
    	//answers
    	  // seqno
    	  // answer

		var request=utils.wrap_request(data)
		//validate request

		return utils.wrap_response(api.submitSurveyAnswers(request))


    }


}

module.exports=appapi

