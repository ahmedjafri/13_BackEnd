var db = require('../models/index');
var Q = require('q');

module.exports = {
    createGame: function(req, res) {
        console.log(req.body)
        var friendUserIds = req.body.friendUserIds;
        var gameCreatorUserId = req.body.gameCreatorUserId;
        friendUserIds.push(gameCreatorUserId);

        // before we save anything to the mysql lets sanitize 
        // the input and return appropriate errors
        // [TODO] - do we need any other validation?
        // [TODO] - more meaningful error messages
        friendUserIds.forEach(function(id) {
            if(!id){
                res.status(400).send("error") // 400 Bad Request
                return;
            }
        });

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
                        res.send(game) 
                    });
                })
        });
    },

    getGame: function(req,res) {
        gameId = req.params.id;

        db.Game.find({ where: {id: gameId}, include: [
            {
              model: db.Player, 
              include: [
                db.User
              ]  
            }
        ] }).then(function(game){ 
            res.send(game)
        }).catch(function(error){
            res.status(500).send(error.message)
            console.log(error)
        })
    }
};