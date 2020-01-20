module.exports = (io) => {
	io.on("connection", socket => {

		require("./join")(socket);

	});
};
