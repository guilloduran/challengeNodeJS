module.exports = (sequelize, dataTypes) => {
	let alias = "User";
	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
		password: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
		rol: {
			type: dataTypes.INTEGER,
		},
	};

	let config = {
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
		deletedAt: false,
	};

	const User = sequelize.define(alias, cols, config);

	return User;
};
