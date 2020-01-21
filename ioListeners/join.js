module.exports = socket => {
	socket.on("join", room => {
		socket.join(room);
		socket.emit("join_status", {room, success: true});
	});
};
