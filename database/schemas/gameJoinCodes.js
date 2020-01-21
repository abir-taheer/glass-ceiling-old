module.exports = (sequelize, Database) => {
	return sequelize.define("gameJoinCodes", {
		code: {
			type: Database.STRING,
			unique: true,
			primaryKey: true
		},
		gameId: {
			type: Database.INTEGER
		},
		active: {
			type: Database.BOOLEAN,
			defaultValue: true,
			allowNull: false
		}

	}, {
		timestamps: false
	});
};
