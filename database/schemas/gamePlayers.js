module.exports = (sequelize, Database) => {
	return sequelize.define("gamePlayers", {
		gameId: {
			type: Database.INTEGER,
		},
		userId: {
			type: Database.INTEGER,
			allowNull: true
		},
		hash: {
			type: Database.STRING(3),
		},
		playerName: {
			type: Database.STRING
		},
		//player status
		// -10 = banned
		// -5 idle admin
		// -3 = idle player
		// -1 = idle spectator
		// 1 = active spectator
		// 3 = active player
		// 5 = active admin
		playerStatus: {
			type: Database.INTEGER,
			allowNull: false,
			defaultValue: 3
		}
	}, {
		indexes: [
			{
				unique: true,
				fields: ["userId", "gameId"]
			},
			{
				unique: true,
				fields: ["hash", "gameId"]
			}
		]
	});
};
