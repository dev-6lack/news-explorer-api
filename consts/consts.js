const { NODE_ENV, JWT_SECRET, MONGO_PATH } = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const MONGO_URL = process.env.NODE_ENV === 'production' ? MONGO_PATH : 'mongodb://localhost:27017/newsdb';
const MONGO_URL_PATTERN = /^https?:\/\/(www\.)?([a-z0-9\-_.]+\.[a-z]{2,})((\/\S{1,})*)$/;

module.exports = {
  SECRET_KEY,
  MONGO_URL,
  MONGO_URL_PATTERN,
};
