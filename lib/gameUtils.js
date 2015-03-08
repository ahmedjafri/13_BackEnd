module.exports = {
    allPlayersJoined: function(players) {
        var allPlayersJoined = true;
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            if (player.status !== 1) {
                allPlayersJoined = false;;
                break;
            }
        }
        return allPlayersJoined;
    },
    startGame: function() {
        
    }
};