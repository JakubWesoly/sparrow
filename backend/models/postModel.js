import mongoose from 'mongoose';

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

export default mongoose.model('Post', userSchema);
