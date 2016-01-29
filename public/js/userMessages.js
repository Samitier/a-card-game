
var send = function(message, data) {
    var obj = {
        room: window.room ,
        data: data
    }
    window.socket.emit(message, obj);
}

module.exports = {
    sendMovement: function(card, position) {
        send('make movement', {card:card, position:position});
    }
}