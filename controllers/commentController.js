const { Comment } = require("../models");

// Create a new comment:
async function create(req, res) {
  try {
    const content = req.body.content;
    const user = req.body.user;
    const articleId = req.params.id;
    await Comment.create({
      content,
      userId: user,
      articleId,
    });
    res.redirect(`/articulo/${articleId}`);
  } catch (error) {
    res.render("errorTemplate", { error });
  }
}

// Edit a comment
async function edit(req, res) {
  const content = req.body.content;
  const commentToEdit = await Comment.findByPk(req.params.id);

  commentToEdit.content = content;

  await commentToEdit.save();

  res.redirect("/panel/comentarios");
}

// Destroy a comment:
async function destroy(req, res) {
  await Comment.destroy({
    where: { id: req.params.id },
  });

  res.redirect("/panel/comentarios");
}

module.exports = {
  create,
  edit,
  destroy,
};
