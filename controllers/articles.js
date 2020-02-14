const Article = require('../models/Article');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getArticles = (req, res, next) => {
  const { _id } = req.user;

  Article.find({ owner: _id })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

const deleteArticle = async (req, res, next) => {
  const { articleId } = req.params;
  const { _id } = req.user;

  try {
    const article = await Article.findById(articleId).select('+owner');
    if (!article) {
      throw new NotFoundError('Статья не найдена');
    }
    const isOwner = String(_id) === String(article.owner);

    if (isOwner) {
      await Article.findByIdAndRemove(articleId);
      res.status(200).send('Новость удалена');
    } else {
      throw new ForbiddenError('У вас недостаточно прав');
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
