'use strict';

var bodyParser = require('body-parser');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.set('X-Auth-Required', 'true');
  req.session.returnUrl = req.originalUrl;
  res.status(401).send({"loginURL": "http://" + req.get('host') + "/login"});
}

module.exports = function(app){

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	var gameController = require('./controllers/gameController')(app);
  
  	app.all('/api*', ensureAuthenticated);

	app.get('/api/games', gameController.getAllGames);
	app.post('/api/game', gameController.createGame);
	app.get('/api/game/:id', gameController.getGame);
};