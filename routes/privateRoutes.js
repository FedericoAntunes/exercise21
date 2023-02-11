const express = require("express");
const router = express.Router();
const privateController = require("../controllers/privateController");

// Rutas relacionadas al panel de control (Admin):
// ...

router.get("/articulos", privateController.showArticlesPanel);
router.get("/usuarios", privateController.showUsersPanel);
router.get("/comentarios", privateController.showCommentsPanel);

module.exports = router;
