var socket = require('socket.io-client')('http://localhost:3000/');

exports.postMessage = function(req, res, next) {
	socket.emit('send:message', {
		'room': req.body.room,
		'message': req.body.message
	});
	res.send("thanks");
};