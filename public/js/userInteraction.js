
var selectedCard = -1;

module.exports = {
        selectCard: function (elem) {
            var cardId = $(elem).data("card-id");
            if(selectedCard == cardId || selectedCard == -1) {
                $(elem).toggleClass('card-active');
                if (selectedCard == cardId) selectedCard = -1;
                else {
                    selectedCard = cardId;
                }
            }
            $(".card-interaction").hover(function() {
                if(selectedCard!=-1) $(this).toggleClass("card-interaction-hover");
            });
        },
        selectPosition: function(elem) {
            var cardIndex = $(elem).data("card-index");
            console.log(cardIndex);
        }
};