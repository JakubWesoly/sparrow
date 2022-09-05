import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Nie podano nazwy użytkownika'],
      minlength: [3, 'Nick musi mieć więcej niż 3 znaki'],
      maxlength: [16, 'Nick musi mieć mniej niż 16 znaków'],
    },
    email: {
      type: String,
      required: [true, 'Nie podano e-maila'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Nie podano hasła'],
    },
    picture_url: {
      type: String,
      required: false,
      default:
        'https://res.cloudinary.com/dhk6z5vzz/image/upload/v1660340310/nrgi6lerl3bbjyzoguef.jpg',
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: [],
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    followed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    liked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const handleE11000 = (error, res, next) => {
  if (error.message) {
    if (error.message.startsWith('E11000')) {
      next(new Error('Ten e-mail już istnieje'));
    } else if (error.message.startsWith('User validation failed: username: ')) {
      const newMessage = error.message.substr(34, error.message.length - 34);
      next(new Error(newMessage));
    } else {
      next();
    }
  }
};

userSchema.post('save', handleE11000);
userSchema.post('init', handleE11000);

export default mongoose.model('User', userSchema);
