var io = require('socket.io')();

io.on('connection', function(socket) {
	//console.log('a new client socket connected');

	socket.on('join:room', function(data) {
		//console.log('a member joined room ', data.room);
		socket.join(data.room);
	});

	socket.on('send:message', function(data) {
		//io.to(data.room).emit('room:message', {'room':data.room, 'message':data.message});
		socket.to(data.room).emit('room:message', {'room':data.room, 'message':data.message});
	});
});

module.exports = io;