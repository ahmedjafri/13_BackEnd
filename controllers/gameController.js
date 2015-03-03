var db = require('../models/index');
var Q = require('q');

module.exports = {
    createGame: function(req, res) {
        console.log(req.body)
        var friendUserIds = req.body.friendUserIds;
        var gameCreatorUserId = req.body.gameCreatorUserId;
        friendUserIds.push(gameCreatorUserId);

        var playerCreatePromises = [];
        friendUserIds.forEach(function(id) {
            playerCreatePromises.push(db.Player.create({
                user_id: id
            }));
        });

        db.Game.create().then(function(game){
            Q.all(playerCreatePromises)
                .then(function(playerInstances) {
                    game.setPlayers(playerInstances).done(function(){ res.send() });
                })
        });
    }
};