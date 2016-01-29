var userInteraction = require("./userInteraction");

var handx = 0, tablex = 0;
var cardSeparation = 8.5;

var yourcardTemplate = function (cardname, cardId) {
    var html = "<div data-card-id='" + cardId + "' class='pure-u-sm-1-8 pure-u-xl-1-12 pure card card-yourcard'>" +
        "<img src='http://placehold.it/150x150' class='pure-img card-thumbnail'>" +
        "<div class='card-content'>" + cardname + "</div></div>";
    var card = $.parseHTML(html);
    $(card).click(function(){userInteraction.selectCard(this);});
    return card;
};

var tablecardTemplate = function (cardname, cardvalue) {
    var html = "<div class='pure-u-sm-1-8 pure-u-xl-1-12 pure card card-tablecard'>" +
        "<img src='http://placehold.it/150x150' class='pure-img card-thumbnail'>" +
        "<div class='card-content'>" + cardname + "<br><br>" + cardvalue + "</div></div>";
    return $.parseHTML(html);
};

var tableCardInteraction = function (cardIndex) {
    var html = "<div class='pure-u-sm-1-8 pure-u-xl-1-12 pure card card-tablecard card-interaction'" +
        "data-card-index='" + cardIndex + "'></div>";
    var card = $.parseHTML(html);
    $(card).click(function(){userInteraction.selectPosition(this);});
    return card;
};


module.exports = {
    hideLoadingMessage: function () {
        $('#loading-text').hide();
    },
    showFlashMessage: function (msg) {
        $('#flash-message').text(msg).fadeIn();
    },
    showHand: function (cards) {
        $('#yourhand').empty();
        handx=0;
        cards.forEach(function (card, index) {
            var card = yourcardTemplate(card.title, index);
            $(card).css("left", handx + '%').click(userInteraction.selectCard(this));
            $('#yourhand').append(card);
            handx += cardSeparation;
        });
    },
    showTable: function (cards) {
        $('#table').empty();
        tablex=0;
        cards.forEach(function (card, index) {
            var interaction = tableCardInteraction(index), tableCard = tablecardTemplate(card.title, card.value);
            $(interaction).css("left", tablex - cardSeparation / 2 + '%');
            $(tableCard).css("left", tablex + '%');
            $('#table').append(interaction).append(tableCard);
            tablex += cardSeparation;
        });
        $('#table').append(tableCardInteraction(cards.length))
            .children().last().css("left", tablex - cardSeparation / 2 + '%');
    },
    setTurn: function (turn) {
        if(turn) log("Your turn!");
        else log("Waiting for the other players to play a card");
        userInteraction.setTurn(turn);
    }
};