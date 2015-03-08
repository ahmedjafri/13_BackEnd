var db = require('../models/index');
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

        var playerCreatePromises = [];
        friendUserIds.forEach(function(id) {
            playerCreatePromises.push(db.Player.create({
                user_id: id
            }));
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