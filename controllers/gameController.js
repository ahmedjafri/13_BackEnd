var db = require('../models/index');
var Q = require('q');

module.exports = {
    createGame: function(req, res) {
        var friendUserIds = req.body.friendUserIds;
        var gameCreatorUserId = req.body.gameCreatorUserId;

        var playerIds = friendUserIds.push(gameCreatorUserId);

        //TODO: use Q here
        db.Game.sync().then(function () {
            db.Game.create();
        });

        db.Player.sync().then(function() {

            playerIds.forEach(function(playerId) {
                db.Player.create({
                    gameId: 'Ahmed',
                    lastName: 'Jafri'
                });
            });
        });
    }
};