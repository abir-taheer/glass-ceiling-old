module.exports = (sequelize, Database) => {
	return sequelize.define("gameCardPacks", {
		cardPackId: {
			type: Database.INTEGER
		},
		gameId: {
			type: Database.INTEGER,
		}
	}, {
		timestamps: false
	});
};
