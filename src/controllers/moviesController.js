const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesController = {
	list: (req, res) => {
		db.Movie.findAll({
			include: ["genre"],
			where: {},
			order: [["title", "ASC"]],
		}).then((movies) => {
			res.render("moviesList.ejs", {
				movies,
				user: req.session.userLogged,
				privileges: req.session.privileges,
			});
		});
	},
	detail: (req, res) => {
		db.Movie.findByPk(req.params.id, {
			include: ["genre", "actors"],
		}).then((movie) => {
			res.render("moviesDetail.ejs", {
				movie,
				user: req.session.userLogged,
				privileges: req.session.privileges,
			});
		});
	},

	//rutas para trabajar con el CRUD
	add: function (req, res) {
		let promGenres = Genres.findAll();
		let promActors = Actors.findAll();

		Promise.all([promGenres, promActors])
			.then(([allGenres, allActors]) => {
				return res.render(path.resolve(__dirname, "..", "views", "moviesAdd"), {
					allGenres,
					allActors,
					user: req.session.userLogged,
					privileges: req.session.privileges,
				});
			})
			.catch((error) => res.send(error));
	},
	create: function (req, res) {
		Movies.create({
			title: req.body.title,
			rating: req.body.rating,
			awards: req.body.awards,
			release_date: req.body.release_date,
			length: req.body.length,
			genre_id: req.body.genre_id,
		})
			.then(() => {
				return res.redirect("/");
			})
			.catch((error) => res.send(error));
	},
	edit: function (req, res) {
		let movieId = req.params.id;
		let promMovies = Movies.findByPk(movieId, { include: ["genre", "actors"] });
		let promGenres = Genres.findAll();
		let promActors = Actors.findAll();
		Promise.all([promMovies, promGenres, promActors])
			.then(([Movie, allGenres, allActors]) => {
				Movie.release_date = moment(new Date(Movie.release_date)).format("L");
				return res.render(
					path.resolve(__dirname, "..", "views", "moviesEdit"),
					{
						Movie,
						allGenres,
						allActors,
						user: req.session.userLogged,
						privileges: req.session.privileges,
					}
				);
			})
			.catch((error) => res.send(error));
	},
	update: function (req, res) {
		let movieId = req.params.id;
		Movies.update(
			{
				title: req.body.title,
				rating: req.body.rating,
				awards: req.body.awards,
				release_date: req.body.release_date,
				length: req.body.length,
				genre_id: req.body.genre_id,
			},
			{
				where: { id: movieId },
			}
		)
			.then(() => {
				return res.redirect(`/movies/detail/${movieId}`);
			})
			.catch((error) => res.send(error));
	},
	delete: function (req, res) {
		let movieId = req.params.id;
		Movies.findByPk(movieId)
			.then((Movie) => {
				return res.render(
					path.resolve(__dirname, "..", "views", "moviesDelete"),
					{
						Movie,
						user: req.session.userLogged,
						privileges: req.session.privileges,
					}
				);
			})
			.catch((error) => res.send(error));
	},
	destroy: async function (req, res) {
		let movieId = req.params.id;
		const movie = await Movies.findByPk(req.params.id);
		await Actors.update(
			{
				favorite_movie_id: null,
			},
			{
				where: { favorite_movie_id: movieId },
			}
		);

		await movie.setActors([]);
		await Movies.destroy({ where: { id: movieId }, force: true })
			.then(() => {
				return res.redirect("/");
			})
			.catch((error) => res.send(error));
	},
};

module.exports = moviesController;
