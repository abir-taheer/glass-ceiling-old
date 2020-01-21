module.exports = (sequelize, Database) => {
	return sequelize.define("playedCards", {
		cardId: {
			type: Database.INTEGER
		},
		turnId: {
			type: Database.INTEGER
		},
		playerId: {
			type: Database.INTEGER
		}
	});
};
