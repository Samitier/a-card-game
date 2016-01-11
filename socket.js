var socketio = require('socket.io');
var deck = require('./models/deck');
var utils = require('./utils.js');

function init(server) {
    var io = socketio(server);

    var rooms = [];
    var isRoomEmpty = true;

    io.on('connection', function (client) {
        //if there's no one waiting, we create a room
        if (isRoomEmpty) {
            var newRoom = {id:Math.random().toString(36).substring(8), users:[client.id], deck: utils.shuffle(deck).slice()};
            client.join(newRoom.id);
            rooms.push(newRoom);
            isRoomEmpty = false;
        }
        //if there is, we put them together
        else {
            client.join(rooms[rooms.length-1].id);
            rooms[rooms.length-1].users.push(client.id);

            //emiting an event to the whole room with the room id (and the user names when implemented)
            io.to(rooms[rooms.length-1].id).emit("connected to room", rooms[rooms.length-1].id);

            //we send the starting cards to each player
            rooms[rooms.length-1].users.forEach(function(user) {
                var cards = rooms[rooms.length-1].deck.splice(0,4);
                io.to(user).emit('your cards', cards);
            });

            //we send the starting match card
            io.to(rooms[rooms.length-1].id).emit("starting card", rooms[rooms.length-1].deck.shift());

            //we set the actual turn to an arbitrary player to start the match
            io.to(rooms[rooms.length-1].users[utils.randomInt(0,1)]).emit('your turn');

            isRoomEmpty = true;
        }

        io.on('disconnect', function(client) {
            client.broadcast.emit("player disconnected", client.id);
        });
    });

    return io;
}

module.exports = init;