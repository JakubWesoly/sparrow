const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Tekst nie może być pusty'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Nie odnaleziono użytkownika'],
      ref: 'User',
    },
    likes: {
      type: Number,
      default: 0,
    },
    reposts: {
      type: Number,
      default: 0,
    },
    // comments: [{

    // }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', userSchema);
