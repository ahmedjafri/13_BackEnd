var Q = require('q');

module.exports = function(app){
    return {
        createGame: function(req, res) {
            console.log(req.body)
            var friendUserIds = req.body.friendUserIds;
            var gameCreatorUserId = req.body.gameCreatorUserId;

            if(friendUserIds && friendUserIds instanceof Array)
                friendUserIds.push(gameCreatorUserId);
            else {
                res.status(400).send({"error":"please set friendUserIds (it is an array)."}) // 400 Bad Request
                return;
            }

            // before we save anything to the mysql lets sanitize 
            // the input and return appropriate errors
            // [TODO] - do we need any other validation?
            // [TODO] - more meaningful error messages
            friendUserIds.forEach(function(id) {
                if(!id){
                    res.status(400).send({"error":"gameCreatorUserId is not defined."}) // 400 Bad Request
                    return;
                }else {
                    app.db.models.User.findAndCountAll({where: {id: id}})
                    .then(function(result){
                        if(result.count <= 0){
                            res.status(400).send({"error":"id " + id + " does not exist."}) // 400 Bad Request
                            return;
                        }
                    });
                }
            });

            var playerCreatePromises = [];
            friendUserIds.forEach(function(id) {
                playerCreatePromises.push(app.db.models.Player.create({
                    user_id: id
                }));
            });

            app.db.models.Game.create()
            .catch(function(err){
                res.status(500).send(err);
            })
            .then(function(game){
                Q.all(playerCreatePromises)
                    .catch(function(err){
                        res.status(500).send(err);
                    })
                    .then(function(playerInstances) {
                        game.setPlayers(playerInstances).then(function(){ 
                            res.send(game);
                        });
                    })
            });
        },
        getGame: function(req,res) {
            gameId = req.params.id;

            app.db.models.Game.find({ where: {id: gameId}, include: [
                {
                  model: app.db.models.Player, 
                  include: [
                    app.db.models.User
                  ]  
                }
            ] }).then(function(game){ 
                if(game)
                    res.send(game);
                else
                    res.status(404).send({"error":"No game at this endpoint."});
            }).catch(function(error){
                res.status(500).send(error.message)
                console.log(error)
            })
        },

        getAllGames: function(req,res) {
            gameId = req.params.id;

            app.db.models.Game.findAll({include: [{
                model:app.db.models.Player,
                where: {"user_id": req.user.id}
            }]})
            .then(function(players){ 
                if(players)
                    res.send(players);
                else
                    res.status(404).send({"error":"No games here."});
            }).catch(function(error){
                res.status(500).send(error.message)
                console.log(error)
            })
        }
    };
};