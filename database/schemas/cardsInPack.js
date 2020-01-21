module.exports = (sequelize, Database) => {
	return sequelize.define("cardsInPack", {
		cardPackId: {
			type: Database.INTEGER
		},
		cardId: {
			type: Database.INTEGER
		}
	}, {
		timestamps: false
	});
};
