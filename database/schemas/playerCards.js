module.exports = (sequelize, Database) => {
	return sequelize.define("playerCards", {
		cardId: {
			type: Database.INTEGER
		},
		gameId: {
			type: Database.INTEGER
		},
		playerId: {
			type: Database.INTEGER
		},
		isUsed: {
			type: Database.BOOLEAN
		}
	}, {
		timestamps: false
	});
};
