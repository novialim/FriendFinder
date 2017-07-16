// Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

'use strict';

var celebrityData = require ('../data/friends');

module.exports = function (app) {

	app.get('/api/friends', function (req, res){
		res.json(celebrityData);
	});

	app.post('/api/friends', function (req, res){

		var smallestScore = 0;
		var bestMatch;

		for (var i=0; i<celebrityData.length; i++){
			var compArray = [];

			for (var j=0; j< celebrityData[i].scores.length; j++){
				compArray.push(Math.abs(celebrityData[i].scores[j] - req.body.scores[j]));
			}

			var matchScore = compArray.reduce((a,b) => a+b, 0);

			if(smallestScore == 0){
				smallestScore = matchScore;
			}

			if (matchScore < smallestScore){
				smallestScore = matchScore;

				bestMatch = celebrityData[i];
			}
		}

		res.json(bestMatch);

		celebrityData.push(req.body);
	});
}