import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

import errorMiddleware from './middleware/errorMiddleware.js';

import connectDB from './db.js';

import './db.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/search', searchRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`[SERVER] started listening @ ${PORT}`);
});
