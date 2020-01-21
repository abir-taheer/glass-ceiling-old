module.exports = (sequelize, Database) => {
	return sequelize.define("gameSettings", {
		gameId: {
			type: Database.INTEGER
		},
		type: {
			type: Database.STRING,
			// allowed ["ranking", "democracy", "standard"]
			defaultValue: "standard",
			allowNull: false
		},
		turnTimer: {
			type: Database.INTEGER,
			defaultValue: 90,
			allowNull: false
		},
		tradePointsRedraw: {
			type: Database.BOOLEAN,
			defaultValue: false
		},
		randoCardrissian: {
			type: Database.BOOLEAN,
			defaultValue: false
		},
		chat: {
			type: Database.BOOLEAN,
			defaultValue: true
		}

	});
};
