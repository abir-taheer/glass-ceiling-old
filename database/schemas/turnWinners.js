module.exports = (sequelize, Database) => {
	return sequelize.define("turnWinners", {
		turnId: {
			type: Database.INTEGER
		},
		playerId: {
			type: Database.INTEGER
		},
		pointsEarned: {
			type: Database.BOOLEAN
		}
	}, {
		timestamps: true
	});
};
