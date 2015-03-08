var db = require('../models/index');
var gameUtils = require('../lib/gameUtils');
var Q = require('q');

module.exports = {
    createGame: function(req, res) {
        var friendUserIds = req.body.friendUserIds;
        var gameCreatorUserId = req.body.gameCreatorUserId;

        if (!gameCreatorUserId) {
            res.status(400).send({ message: 'No game creator user id' });
            return;
        }

        friendUserIds.push(gameCreatorUserId);

        var playerCreatePromises = friendUserIds.map(function(id) {
            return db.Player.create({
                user_id: id
            });
        }); 

        db.Game.create().then(function(game){
            Q.all(playerCreatePromises)
                .then(function(playerInstances) {
                    game.setPlayers(playerInstances).then(function(){ 
                        res.status(201).send(game);
                    });
                })
        });
    },

    joinGame: function(req, res) {
        var gameId = req.params.gameId;
        var playerId = req.body.playerId;
        db.Player.update({
            status: 1
        }, {
            where: {
                user_id: playerId,
                game_id: gameId
            }
        }).then(function() {
            return db.Player.findAll({
                where: {
                    game_id: gameId
                }
            });
        }).then(function(players) {
            if (!gameUtils.allPlayersJoined(players)) {
                res.status(200).send({ message: 'Player successfully joined.'});
            } else {
            // if all the players have joined the game,
            // update game play state and notify players
                db.Game.update({ playState: 1 }, { where: { id: gameId }})
                    .then(function() {
                        // TODO: send push notifications to all the players
                        res.status(200).send({ message: 'Player successfully joined.'});
                    })
                    .catch(function(err) {
                        res.status(500).send(err.message)
                    });
            }
        });
    },

    getGame: function(req,res) {
        gameId = req.params.id;

        db.Game.find({ 
            where: { id: gameId }, 
            include: [
                {
                    model: db.Player, 
                    include: [
                        db.User
                    ]  
                }
            ] 
        }).then(function(game){ 
            res.status(200).send(game);
        }).catch(function(error){
            res.status(500).send(error.message)
        })
    }
};