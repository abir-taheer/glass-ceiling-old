module.exports = (sequelize, Database) => {
	return sequelize.define("games", {
		name: {
			type: Database.STRING
		},
		status: {
			type: Database.BOOLEAN,
			defaultValue: 0
		}
	});
};
