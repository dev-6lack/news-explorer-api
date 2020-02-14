const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const routerArticles = require('./articles');
const routerUsers = require('./users');

const { signIn, signUp } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), signUp);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), signIn);

router.use(auth);

router.use('/', routerUsers);
router.use('/', routerArticles);

module.exports = router;
