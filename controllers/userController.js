const { User, Article, Comment } = require("../models");
const bcrypt = require("bcryptjs");

/* In the userController we define the handlers functions for the routes that modifies the users table in the DB. */

// Show the form for creating a new resource.
async function store(req, res) {
  // First we define the constants with the parameters we get from the forms.
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Then we use "try" to create the new user
  try {
    await User.create({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.redirect("/");
  } catch (error) {
    // If the "try" fails, the "catch" will hand the error, in this case there's one possible error,
    // the try will fail if the email is already registered for another user.
    res.render("errorTemplate", { error });
  }
}

// Show the form for editing the specified resource.
async function update(req, res) {
  const userToEdit = await User.findByPk(req.params.id);

  userToEdit.firstname = req.body.firstname;
  userToEdit.lastname = req.body.lastname;
  userToEdit.email = req.body.email;

  await userToEdit.save();

  res.redirect("/panel/usuarios");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    res.send("Usuario no encontrado");
    return;
  }
  // Takes both promises from the array, and makes them a singular promise, then wait until resolve them to after destroy the user.
  await Promise.all([
    Article.update({ userId: 1 }, { where: { userId: req.params.id } }),
    Comment.update({ userId: 1 }, { where: { userId: req.params.id } }),
  ]);

  await user.destroy();

  res.redirect("/panel/usuarios");
}

module.exports = {
  store,
  update,
  destroy,
};
