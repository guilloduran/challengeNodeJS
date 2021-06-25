var express = require("express");
const { check, validationResult, body } = require("express-validator");
var router = express.Router();
const usersController = require("../controllers/usersController");

const guestMiddleware = require("../middlewares/guestMiddleware");

router.get("/users/addUser", usersController.addUser);
router.post("/users/register", usersController.register);

router.get("/users/noprivilege", usersController.noPrivilege);

router.get("/logout", usersController.logout);

router.get("/users/login", guestMiddleware, usersController.login);
router.post("/users/loginProcess", usersController.loginProcess);

module.exports = router;
