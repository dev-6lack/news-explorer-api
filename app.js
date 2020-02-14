const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const NotFoundError = require('./errors/not-found-err');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL } = require('./consts/consts');
const { errorHandler } = require('./middlewares/error-handler');


mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', router);

// Errors Block
app.use(errorLogger);
app.use(errors());
app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найдeн');
});
app.use(errorHandler);
