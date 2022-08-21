const mongoose = require('mongoose');
const { regExp } = require('../consts/consts');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be no more than 30, got {VALUE}'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regExp.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
