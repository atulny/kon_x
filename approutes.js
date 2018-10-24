'use strict';

//transport layer using http


module.exports = function(app) {
	var api = require('./api');
	
  //  Routes - End points
	app.route('/surveys')
	    .post(function(req,res){
	    	api.createSurvey(req).then(
		      function(user){res.json(user);}
		    ).catch(function(err){
		      res.send(err);
		    });
	    });
		
	app.route('/users')
	    .post(function(req,res){
	    	api.createParticipant(req).then(
		      function(user){res.json(user);}
		    ).catch(function(err){
		      res.send(err);
		    });
	    } );

	app.route('/usersurveys')
	    .get(function(req,res){
	    	api.getAvailableSurveys(req).then(
		      function(user){res.json(user);}
		    ).catch(function(err){
		      res.send(err);
		    });
	    }) 
	   	.post(api.submitSurveyAnswers);
	    
};
