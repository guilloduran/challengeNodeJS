const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { check, body, validationResult } = require("express-validator");

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;
const Users = db.User;

const usersController = {
	addUser: function (req, res) {
		let promUsers = Users.findAll();
		Promise.all([promUsers])
			.then(([promUsers]) => {
				return res.render(path.resolve(__dirname, "..", "views", "register"), {
					user: req.session.userLogged,
					privileges: req.session.privileges,
					promUsers,
				});
			})
			.catch((error) => res.send(error));
	},
	register: function (req, res) {
		Users.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		})
			.then(() => {
				return res.redirect("/");
			})
			.catch((error) => res.send(error));
	},
	login: function (req, res) {
		res.render(path.resolve(__dirname, "..", "views", "login"), {
			user: req.session.userLogged,
			privileges: req.session.privileges,
		});
	},
	loginProcess: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			Users.findAll({
				where: { email: req.body.email, password: req.body.password },
			}).then((user) => {
				if (user.length > 0) {
					req.session.userLogged = user[0].dataValues.name;
					req.session.privileges = user[0].dataValues.rol;
					if (req.body.rememberMe != undefined) {
						res.cookie("rememberMe", req.session.userLogged, {
							maxAge: 99999,
						});
					}
					res.redirect("/");
				} else {
					console.log(user);
					return res.render(path.resolve(__dirname, "..", "views", "login"), {
						user,
						errors: {
							email: {
								msg: "Credenciales invalidas!",
							},
						},
					});
				}
			});
		}
	},
	logout: (req, res) => {
		res.clearCookie("userEmail");
		req.session.destroy();
		return res.redirect("/");
	},
	noPrivilege: function (req, res) {
		return res.render(path.resolve(__dirname, "..", "views", "noprivilege"), {
			user: req.session.userLogged,
			privileges: req.session.privileges,
		});
	},
};

module.exports = usersController;
