// Require models
const { Article, Comment } = require("../models");

// Require formidable
const formidable = require("formidable");

// Store new resource from form
async function store(req, res) {
  // Request and store file via formidable
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img/articlesImg",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    // Parse form and generate resource
    const loggedUser = req.user;
    const title = fields.title;
    const content = fields.content;
    const image = files.image.newFilename;
    if (files.image.originalFilename === "") {
      await Article.create({
        title: title,
        content: content,
        image: "default-image.jpg",
        userId: loggedUser.id,
      });
    } else {
      await Article.create({
        title: title,
        content: content,
        image: image,
        userId: loggedUser.id,
      });
    }

    res.redirect("/");
  });
}

// Update existing resource from admin form
async function update(req, res) {
  const title = req.body.title;
  const content = req.body.content;

  const articleToEdit = await Article.findByPk(req.params.id);

  articleToEdit.title = title;
  articleToEdit.content = content;

  await articleToEdit.save();

  res.redirect("/panel/articulos");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Comment.destroy({
    // Remove comments first
    where: { articleId: req.params.id },
  });
  await Article.destroy({
    // Then remove article from storage
    where: { id: req.params.id },
  });
  res.redirect("/panel/articulos");
}

// Exports
module.exports = {
  store,
  update,
  destroy,
};
