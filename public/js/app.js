$=require("jquery");
var io = require("socket.io-client");
var graphics = require("./graphicUtils");


window.socket = io.connect(window.location.origin);
window.room = 0;

window.socket.on("match start", function(msg){
    window.room  = msg.roomId;

    graphics.hideLoadingMessage();
    graphics.showFlashMessage("Connected to the room #" + window.room);

    graphics.showHand(msg.match.player.hand);
    graphics.showTable(msg.match.tableCards);

    graphics.setTurn(msg.match.turn);
});

window.socket.on("match updated", function(msg){
    var message = "";
    if(msg.turn) message ="Rival movement: ";
    if(msg.lastMovement.correct) message += "Correct!";
    else message +="Wrong!";

    graphics.showFlashMessage(message);

    graphics.showHand(msg.player.hand);
    graphics.showTable(msg.tableCards);

    log("And the rival has: " + msg.rivals[0].hand + " cards in his hand.");
    log("");

    graphics.setTurn(msg.turn);
});

window.socket.on("player disconnected",function(msg){
    log("The player " + msg + " disconnected");
    log("");
});





