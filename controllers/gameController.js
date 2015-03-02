var Sequelize = require('sequelize');

var sequelize = new Sequelize('thirteen', 'thirteen', 'ZPMKZ82fhNjXDD78', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var Player = require('../models/Player')(sequelize);
var Game = require('../models/Game')(sequelize);

module.exports = {
	createGame: function(req, res) {
		console.log(req);
		var friendUserIds = req.body.friendUserIds;
		var gameCreatorUserId = req.body.gameCreatorUserId;

		var playerIds = friendUserIds.push(gameCreatorUserId);

		Game.sync({force: true}).then(function () {
			Game.create();
		});

		Player.sync({force: true}).then(function() {

	  		playerIds.forEach(function(playerId,index) {
	  			Player.create({
	    			gameId: 'Ahmed',
	    			lastName: 'Jafri'
	  			});
	  		 });
	  	});
	}
};