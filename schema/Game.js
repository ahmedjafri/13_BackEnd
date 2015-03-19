'use strict';

module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define('Game', {
        playState: {
            type: DataTypes.INTEGER,
            field: 'play_state'
        },
        lastHandPlayed: {
            type: DataTypes.TEXT,
            field: 'last_hand_played'
        },
        currentTurn: {
            type: DataTypes.INTEGER,
            field: 'current_turn'
        }
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        classMethods: {
            associate: function(models) {
                Game.hasMany(models.Player, {foreignKey : 'game_id'});
            }
        }
    });

    return Game;
};