var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var Game = sequelize.define('game', {
	  playState: {
	    type: Sequelize.INTEGER,
	  },
	  lastHandPlayed: {
	    type: Sequelize.TEXT
	  },
	  currentTurn: {
	  	type: Sequelize.INTEGER
	  }
	}, {
	  freezeTableName: true // Model tableName will be the same as the model name
	});

	return Game;
}
