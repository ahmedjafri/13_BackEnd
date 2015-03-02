var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var Player = sequelize.define('player', {
	  gameId: {
	    type: Sequelize.INTEGER,
	  },
	  userId: {
	    type: Sequelize.INTEGER
	  },
	  handOfCards: {
	  	type: Sequelize.TEXT
	  },
	  status: {
	  	type: Sequelize.INTEGER,
	  	comment: "0-INVITED,1-JOINED,2-FINISHED"
	  },
	  turnNumber: {
	  	type: Sequelize.INTEGER
	  }
	}, {
	  freezeTableName: true // Model tableName will be the same as the model name
	});

	return Player;
}
