module.exports = (sequelize, Database) => {
	return sequelize.define("cards", {
		id: {
			type: Database.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		type: {
			type: Database.INTEGER,
			allowNull: false
		},
		content: {
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
