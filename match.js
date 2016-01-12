var utils = require('./utils');
var Deck = require('./models/deck');


module.exports = function() {

    var players = [];
    var turn = 0;
    var deck = [];
    var tableCards = [];
    var lastMovement;

    return {
        //adds a new player to the match
        addPlayer:function(id) {
            players.push({
                id: id,
                hand:[]
            });
        },

        //initialize the match
        initializeMatch: function() {
            deck = utils.shuffle(Deck).slice();
            turn = utils.randomInt(0,players.length-1);
            players.forEach(function(player) {
                player.hand = deck.splice(0,4);
            });
            tableCards.push(deck.shift());
        },

        //makes a match movement from the player @playerId, playing the card @cardIndex on position @position
        makeMovement: function(playerId, cardIndex, position) {
            //invariant checking
            if(players[turn].id != playerId) return;
            var card = players[turn].hand.splice(cardIndex, 1)[0];
            if(!card) return;
            if(position<0 || position>tableCards.length) return;
            //we check the correct position of the card
            var correctPosition;
            for(correctPosition=0; correctPosition<tableCards.length; ++correctPosition) {
                if(card.value > tableCards[correctPosition].value) break;
            }
            //if incorrect, the player draws a card
            var correct = (correctPosition===position);
            if(!correct) players[turn].hand.push(deck.shift());
            //we put the card on the correct position of the table
            tableCards.splice(correctPosition,0,card);
            //save this movement as the last movement
            lastMovement = {player:playerId, card: card, position:position, correct:correct};
            //and pass the turn
            turn++;
            turn %= players.length;
        },


        //returns the match state for one of the players @playerId in a cheating-free object
        getMatchState: function(playerId) {
            var playerIndex = players.map(function(x) {return x.id;}).indexOf(playerId);
            if(!players[playerIndex]) return;
            var cardsWithNoValue = [], rivals = [];
            players[playerIndex].hand.forEach(function(card) {
                cardsWithNoValue.push({title:card.title, image:card.image})
            });
            players.forEach(function(player) {
                if(player.id != playerId) rivals.push({id: player.id, hand:player.hand.length});
            });
            return {
                player:{id:players[playerIndex].id, hand:cardsWithNoValue},
                turn:(playerIndex==turn),
                deck: deck.length,
                tableCards:tableCards,
                lastMovement: lastMovement,
                rivals:rivals
            }
        }
    };
};