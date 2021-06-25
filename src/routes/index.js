const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", moviesController.list);
router.get("/movies/detail/:id", moviesController.detail);
//Rutas del CRUD
router.get("/movies/add", authMiddleware, moviesController.add);
router.post("/movies/create", authMiddleware, moviesController.create);
router.get("/movies/edit/:id", authMiddleware, moviesController.edit);
router.put("/movies/update/:id", authMiddleware, moviesController.update);
router.get("/movies/delete/:id", authMiddleware, moviesController.delete);
router.delete("/movies/delete/:id", authMiddleware, moviesController.destroy);

module.exports = router;
