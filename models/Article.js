const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    validate: {
      validator(check) {
        return /^https?:\/\/(www\.)?([a-z0-9\-_.]+\.[a-z]{2,})((\/\S{1,})*)$/gmi.test(check);
      },
    },
    required: true,
  },

  image: {
    type: String,
    validate: {
      validator(check) {
        return /^https?:\/\/(www\.)?([a-z0-9\-_.]+\.[a-z]{2,})((\/\S{1,})*)$/gmi.test(check);
      },
    },
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
