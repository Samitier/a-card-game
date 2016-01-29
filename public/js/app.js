$=require("jquery");
var io = require("socket.io-client");
var graphics = require("./graphicUtils");


var socket = io.connect(window.location.origin);
var room;

socket.on("match start", function(msg){
    room = msg.roomId;

    graphics.hideLoadingMessage();
    graphics.showFlashMessage("Connected to the room #" + room);

    graphics.showHand(msg.match.player.hand);
    graphics.showTable(msg.match.tableCards);

    if(msg.match.turn) log('You start playing.');
    else log("Waiting for the player to play a card");
    log("");
});

socket.on("match updated", function(msg){
    if(msg.turn) log("Your rival played:");
    else log("You played:");
    log(" the card " + msg.lastMovement.card.title + " in the position " + msg.lastMovement.position);
    if(msg.lastMovement.correct) log("And it was correct!");
    else log("And it was wrong!");

    log("");

    log("This are your cards now:");
    msg.player.hand.forEach(function(m){log(m);});
    log("");

    log("And the rival has: " + msg.rivals[0].hand + " cards in his hand.");
    log("");


    log("Now there are this cards on the table:");
    msg.tableCards.forEach(function(m){log(m);});
    log("");

    if(msg.turn) log("Your turn!");
    else log("Waiting for the other players to play a card");
    log("");
});

socket.on("player disconnected",function(msg){
    log("The player " + msg + " disconnected");
    log("");
});

function makeMovement(msg) {
    send('make movement', msg);
}


///// wrapper for socket.emit ///////
var send = function(message, data) {
    var obj = {
        room:room,
        data: data
    }
    socket.emit(message, obj);
}

