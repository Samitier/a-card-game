var socketio = require('socket.io');

var Match = require('./match');

function init(server) {
    var io = socketio(server);

    var rooms = [];
    var isRoomEmpty = true;

    io.on('connection', function (client) {
        //if there's no one waiting, we create a room and a new match
        if (isRoomEmpty) {
            var match = Match();
            match.addPlayer(client.id);
            var newRoom = {id:Math.random().toString(36).substring(8), users:[client], match: match};
            client.join(newRoom.id);
            rooms.push(newRoom);
            isRoomEmpty = false;
        }
        //if there is, we put them together TODO:some matchmaking
        else {
            client.join(rooms[rooms.length-1].id);
            rooms[rooms.length-1].users.push(client);
            rooms[rooms.length-1].match.addPlayer(client.id);
            rooms[rooms.length-1].match.initializeMatch();

            //we send the starting match event to each player
            rooms[rooms.length-1].users.forEach(function(user) {
                user.emit('match start', {
                    roomId: rooms[rooms.length-1].id,
                    match: rooms[rooms.length-1].match.getMatchState(user.id)
                });
            });
            isRoomEmpty = true;
        }

        client.on('make movement', function(obj) {
            var room = rooms[rooms.map(function(x) {return x.id;}).indexOf(obj.room)];
            if(!room) return;
            room.match.makeMovement(client.id, obj.data.card, obj.data.position);
            room.users.forEach(function(user) {
                user.emit('match updated', room.match.getMatchState(user.id));
            });
        });

        client.on('disconnect', function() {
            //client.broadcast.emit("player disconnected", client.id);
        });
    });

    return io;
}

module.exports = init;