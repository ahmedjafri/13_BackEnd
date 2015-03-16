'use strict';

var bodyParser = require('body-parser');

module.exports = function(app){

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	var gameController = require('./controllers/gameController')(app);

	app.post('/game', gameController.createGame);
	app.get('/game/:id', gameController.getGame);
};