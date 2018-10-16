'use strict';
module.exports = function(app) {
	var surveys = require('./controllers/surveyListController');
	var users = require('./controllers/userListController');
	var usersurveys = require('./controllers/usersurveyListController');

  //  Routes - End points
	app.route('/surveys')
	    .get(surveys.list_surveys)
	    .post(surveys.create_survey);
		
	app.route('/users')
	    .get(users.list_users)
	    .post(users.create_user);

	app.route('/usersurveys/:userId')
	    .get(usersurveys.read_usersurvey)
	    .put(usersurveys.update_usersurvey);
};
