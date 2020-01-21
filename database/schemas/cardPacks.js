module.exports = (sequelize, Database) => {
	return sequelize.define("cardPacks", {
		name: {
			type: Database.STRING,
			allowNull: false
		},
		creator: {
			type: Database.INTEGER
		},
		official: {
			type: Database.BOOLEAN,
			defaultValue: false
		}
	}, {
		timestamps: false
	});
};
