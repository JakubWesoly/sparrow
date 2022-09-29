const mongoose = require('mongoose');

const connectDB = async () => {
  const { MONGODB_URI } = process.env;
  if (MONGODB_URI) {
    try {
      const connection = await mongoose.connect(MONGODB_URI);
      console.log(
        `[database] Connected to database (${connection.connection.host})`
      );
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  } else {
    throw new Error('No URI provided');
  }
};

module.exports = connectDB;
