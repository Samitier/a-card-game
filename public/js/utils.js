var GraphicUtils = function() {
    var yourcardTemplate =   function(cardname) {
        return "<div class='pure-u-sm-1-8 pure-u-xl-1-12 pure card card-yourcard'" +
            "ondragstart='drag(event)' draggable='true'>"+
            "<img src='http://placehold.it/150x150' class='pure-img card-thumbnail'>"+
            "<div class='card-content'>" + cardname + "</div></div>";
    };
    var tablecardTemplate =   function(cardname, cardvalue) {
        return "<div class='pure-u-sm-1-8 pure-u-xl-1-12 pure card card-tablecard'>"+
        "<img src='http://placehold.it/150x150' class='pure-img card-thumbnail'>"+
        "<div class='card-content'>" + cardname + "<br><br>" + cardvalue + "</div></div>";
    };

    var handx = 0, tablex = 0;
    var cardSeparation = 8;

    return {
        hideLoadingMessage: function () {
            $('#loading-text').hide();
        },
        showFlashMessage: function (msg) {
            $('#flash-message').text(msg);
            $('#flash-message').fadeIn();
        },
        showHand: function (cards) {
            cards.forEach(function (card) {
                $('#yourhand').append(yourcardTemplate(card.title));
                $('#yourhand').children().last().css("left", handx +'%');
                handx +=cardSeparation;
            });
        },
        showTable: function(cards) {
            cards.forEach(function (card) {
                $('#table').append(tablecardTemplate(card.title, card.value));
                $('#table').children().last().css("left", tablex + '%');
                tablex += cardSeparation;
            });
        },
    };
};

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