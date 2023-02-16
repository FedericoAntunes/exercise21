const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const commentRoutes = require("./commentRoutes");
const authRoutes = require("./authRoutes");

const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");

// Middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

module.exports = (app) => {
  app.use(makeUserAvailableInViews);
  app.use("/usuarios", userRoutes);
  app.use("/articulos", articleRoutes);
  app.use("/comentarios", commentRoutes);
  app.use("/", authRoutes);
  app.use("/", publicRoutes);
  app.use(isAuthenticated);
  app.use("/panel", privateRoutes);
};
