var GraphicUtils = function() {
    var cardtemplate=   "<div class='pure-u-1-8 card'>"+
                            "<img src='http://placehold.it/150x150' class='pure-img card-thumbnail'>"+
                            "<div class='card-content'>" +
                                "The card title" +
                            "</div></div>";
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
                $('#yourhand').append(cardtemplate);
            });
        }
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