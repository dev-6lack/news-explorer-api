const routerArticles = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { MONGO_URL_PATTERN } = require('../consts/consts');

routerArticles
  .get('/articles', getArticles)
  .post('/articles', celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().pattern(MONGO_URL_PATTERN),
      image: Joi.string().required().pattern(MONGO_URL_PATTERN),
    }),
  }), createArticle)
  .delete('/articles/:articleId', celebrate({
    params: Joi.object().keys({
      articleId: Joi.objectId(),
    }),
  }), deleteArticle);


module.exports = routerArticles;
