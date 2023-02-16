const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pagesController");

// Routes related to the publicviews of the web site:

router.get("/", pageController.showHome);
router.get("/crear_articulo", pageController.showArticleForm);
router.get("/articulo/:id", pageController.showOneArticle);
router.get("/crear_usuario", pageController.showUserForm);
router.get("/api/articulos", pageController.showArticlesApi);
router.get("/login", pageController.showLoginForm);

module.exports = router;
