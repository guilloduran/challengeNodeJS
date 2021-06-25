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

/* ------- */

/* const fs = require("fs");

const User = {
	filename: "src/data/usersDataBase.json",

	getData: function () {
		return JSON.parse(fs.readFileSync(this.filename, "utf-8"));
	},

	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},

	findAll: function () {
		return this.getData();
	},

	findByPk: function (id) {
		let allUsers = this.findAll();
		let userFound = allUsers.find((oneUser) => oneUser.id == id);
		return userFound;
	},

	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find((oneUser) => oneUser[field] == text);
		return userFound;
	},

	create: function (userData) {
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData,
		};
		allUsers.push(newUser);
		fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, ""));
		return newUser;
	},

	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter((oneUser) => oneUser.id !== id);
		fs.writeFileSync(this.filename, JSON.stringify(finalUsers, null, ""));
		return true;
	},
};
 */
