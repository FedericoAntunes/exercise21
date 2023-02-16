const passport = require("passport");

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

module.exports = { login };
