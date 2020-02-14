const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../controllers/users');
const User = require('../models/User');

const UnauthorizedErr = require('../errors/unauthorized');
const ForbiddenError = require('../errors/forbidden-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовок

  // убеждаемся, что он есть и начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedErr('Требуется авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, (JWT_SECRET || 'dev-secret'));
    User.findById(payload._id)
      .then((user) => {
        if (!user) {
          throw new ForbiddenError('Недостаточно прав');
        } else {
          req.user = payload;
          return next();
        }
      })
      .catch(next);
  } catch (err) {
    throw new UnauthorizedErr('Требуется авторизация');
  }
};
