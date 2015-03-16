'use strict';

module.exports = function(sequelize, DataTypes) {
    var Player = sequelize.define('Player', {
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
                Player.belongsTo(models.User, {foreignKey : 'user_id'});
                Player.belongsTo(models.Game, {foreignKey : 'game_id'});
            }
        }
    });

    return Player;
};