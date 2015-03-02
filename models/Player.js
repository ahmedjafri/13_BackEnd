'use strict';

module.exports = function(sequelize, DataTypes) {
    var Player = sequelize.define('Player', {
        gameId: {
            type: DataTypes.INTEGER,
            field: 'game_id' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id'
        },
        hand: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.INTEGER,
            comment: '0-INVITED, 1-JOINED, 2-FINISHED'
        }
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        classMethods: {
            associate: function(models) {
                // TODO: Need to implement
            }
        }
    });

    return Player;
};
