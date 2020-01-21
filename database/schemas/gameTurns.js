module.exports = (sequelize, Database) => {
	return sequelize.define("gameTurns", {
		gameId: {
			type: Database.INTEGER
		},
		turn: {
			type: Database.INTEGER
		},
		decidingPlayer: {
			type: Database.INTEGER
		},
		blackCard: {
			type: Database.INTEGER
		},
		completed: {
			type: Database.BOOLEAN,
			defaultValue: false
		}
	}, {
		indexes: [{
			unique: true,
			fields: ["gameId", "turn"]
		}]
	});
};
