module.exports = (sequelize, Database) => {
	return sequelize.define("users", {
		id: {
			type: Database.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Database.STRING,
			allowNull: false
		},
		email: {
			type: Database.STRING,
			allowNull: false
		},
		password: {
			type: Database.STRING,
			allowNull: false
		},
		emailVerified: {
			type: Database.BOOLEAN,
			defaultValue: false
		}
	}, {
		timestamps: false
	});
};
