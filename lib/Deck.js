function Deck() {
    this.deck = [];
    for (var i = 0; i < 51; i++) {
        this.deck.push(i);
    }
    this.shuffle();
}

Deck.prototype.shuffle = function() {
    for (var i = this.deck.length - 1; i > 0; i--) {
        var randomIndex = Math.round(Math.random() * i);
        var tempCard = this.deck[randomIndex];
        this.deck[randomIndex] = this.deck[i];
        this.deck[i] = tempCard;
    }
};

Deck.prototype.deal = function(numberOfPlayers) {
    var hands = [];

    for (var i = 0; i < this.deck.length ; i++) {
        hands.push(this.deck.slice(i*13, (i+1)*13));
    };

    return hands;
}


module.exports = Deck;