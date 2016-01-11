$(function() {
    var socket = io.connect(window.location.origin);
    var room;

    log("Waiting for connection");
    log("");

    socket.on("connected to room", function(msg){
        room = msg;
        log("Connected to the room #" + msg);
        log("");
    });

    socket.on("your cards", function(msg){
        log("This are your starting cards:");
        msg.forEach(function(m){log(m);});
        log("");
    });

    socket.on("starting card", function(msg){
        log("The match starts with this card:");
        log(msg);
        log("");
    });

    socket.on("player disconnected",function(msg){
        log("The player " + msg + " disconnected");
        log("");
    });

    socket.on("your turn",function(msg){
        log("You start playing");
        log("");
    });

    function makeMovement(msg) {
        log(msg);
        log("");
        msg.room = room;
        socket.emit('make movement', msg);
    }







    ///// recieving user input /////////
    var sendMessage = function () {
        var message = $('#input-action').val();
        message = cleanInput(message);
        $('#input-action').val('');
        if (message) {
            try {
                message = JSON.parse(message);
            } catch (e) {
                return;
            }
            makeMovement(message);
        }
    }
    //sends when pressing enter
    $(window).keydown(function (event) {
        if (event.which === 13) {
            sendMessage();
        }
    });
    // Prevents input from having injected markup
    function cleanInput (input) {
        return $('<div/>').text(input).text();
    }
});
