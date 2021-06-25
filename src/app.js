var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookies = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
var logger = require("morgan");

const moment = require("moment");

const indexRouter = require("./routes/index");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(methodOverride("_method"));

app.use(
	session({
		secret: "Mi mensaje secreto",
		resave: false,
		saveUninitialized: true,
	})
);
app.use(cookies());

app.use("/", indexRouter);
app.use(usersRoutes);
/* app.use(actorRoutes); */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

app.listen("3001", () => console.log("Servidor corriendo en el puerto 3001"));

module.exports = app;
