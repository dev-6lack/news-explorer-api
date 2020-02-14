const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../consts/consts');

const UnauthorizedErr = require('../errors/unauthorized');
const NotFoundError = require('../errors/not-found-err');
const User = require('../models/User');

const findUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь не найден');
      }
      res
        .status(200)
        .send(result.omitPrivateId());
    })
    .catch(next);
};

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((newUser) => {
      if (newUser) {
        throw new UnauthorizedErr('Пользователь с такой почтой уже существует');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          email,
          password: hash,
        }))
        .then((user) => {
          res.status(201).send(user.omitPrivatePass());
        });
    })
    .catch(next);
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          { _id: user._id },
          SECRET_KEY,
          { expiresIn: '7d' },
        );
        res.send(token);
      } else {
        throw new UnauthorizedErr('Требуется авторизация');
      }
    })
    .catch(next);
};

module.exports = {
  findUser,
  signUp,
  signIn,
  NODE_ENV,
  JWT_SECRET,
};
