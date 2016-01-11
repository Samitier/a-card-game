function init() {
    var socket = io.connect('http://localhost:3000');

    log("Waiting for connection");
    log("");

    socket.on("connected to room", function(msg){
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
};
