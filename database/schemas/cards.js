module.exports = (sequelize, Database) => {
	return sequelize.define("cards", {
		id: {
			type: Database.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		cardType: {
			type: Database.INTEGER,
			allowNull: false
		},
		cardContent: {
			type: Database.STRING,
			allowNull: false
		},
		numResponses: {
			type: Database.INTEGER,
			allowNull: true
		}
	}, {
		timestamps: false
	});
};
