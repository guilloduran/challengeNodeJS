function authMiddleware(req, res, next) {
	if (!req.session.userLogged || req.session.privileges !== 1) {
		return res.redirect("/users/noprivilege");
	}
	next();
}

module.exports = authMiddleware;
