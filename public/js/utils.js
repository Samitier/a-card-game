var GraphicUtils = function() {
    var yourcardTemplate =   function(cardname, cardId) {
        return "<div data-card-id='" + cardId + "' class='pure-u-sm-1-8 pure-u-xl-1-12 pure card card-yourcard'" +
            "onclick='inputHandler.selectCard(this)'>"+
            "<img src='http://placehold.it/150x150' class='pure-img card-thumbnail'>"+
            "<div class='card-content'>" + cardname + "</div></div>";
    };
    var tablecardTemplate =   function(cardname, cardvalue) {
        return "<div class='pure-u-sm-1-8 pure-u-xl-1-12 pure card card-tablecard'>"+
            "<img src='http://placehold.it/150x150' class='pure-img card-thumbnail'>"+
            "<div class='card-content'>" + cardname + "<br><br>" + cardvalue + "</div></div>";
    };
    var tableCardInteraction =  function(cardIndex) {
        return "<div class='pure-u-sm-1-8 pure-u-xl-1-12 pure card card-tablecard card-interaction'"+
            "onclick='inputHandler.selectPosition(this)' data-card-index='" + cardIndex + "'></div>";
    };

    var handx = 0, tablex = 0;
    var cardSeparation = 8.5;

    return {
        hideLoadingMessage: function () {
            $('#loading-text').hide();
        },
        showFlashMessage: function (msg) {
            $('#flash-message').text(msg).fadeIn();
        },
        showHand: function (cards) {
            cards.forEach(function (card, index) {
                $('#yourhand').append(yourcardTemplate(card.title, index)).children().last().css("left", handx +'%');
                handx +=cardSeparation;
            });
        },
        showTable: function(cards) {
            cards.forEach(function (card, index) {
                $('#table').append(tableCardInteraction(index))
                    .children().last().css("left", tablex-cardSeparation/2 + '%');
                $('#table').append(tablecardTemplate(card.title, card.value))
                    .children().last().css("left", tablex + '%');
                tablex += cardSeparation;
            });
            $('#table').append(tableCardInteraction(cards.length))
                .children().last().css("left", tablex-cardSeparation/2 + '%');
        },
    };
};


//input handling
var InputHandler = function() {
    var selectedCard = -1;

    return {
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
};

var inputHandler = InputHandler();

//Responsive menu
(function (window, document) {
    document.getElementById('toggle').addEventListener('click', function (e) {
        document.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
        document.getElementById('toggle').classList.toggle('x');
    });
})(this, this.document);


//The logger
var old = console.log;
var logger = document.getElementById('log');
var log = function (message) {
    console.log(message);
    if (typeof message == 'object') {
        logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
    } else {
        logger.innerHTML += message + '<br />';
    }
}