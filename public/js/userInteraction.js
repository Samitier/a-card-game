var messages = require("./userMessages");
var selectedCard = -1;
var yourturn = false;

module.exports = {
        selectCard: function (elem) {
            var cardId = $(elem).data("card-id");
            if((selectedCard == cardId || selectedCard == -1) && yourturn) {
                $(elem).toggleClass('card-active');
                if (selectedCard == cardId) selectedCard = -1;
                else {
                    selectedCard = cardId;
                }
            }
            $(".card-interaction").hover(function() {
                if(selectedCard!=-1 && yourturn) $(this).toggleClass("card-interaction-hover");
            });
        },
        selectPosition: function(elem) {
            var selectedPosition = $(elem).data("card-index");
            if(selectedCard!=-1 && yourturn) messages.sendMovement(selectedCard, selectedPosition);
        },
        setTurn: function(turn){
            yourturn = turn;
        }
};