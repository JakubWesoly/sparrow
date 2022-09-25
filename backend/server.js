import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

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


const pathname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(pathname, '../frontend/build')));
app.get('*', (req, res) => res.sendFile(path.join(pathname, '../frontend/build/index.html')));

app.use(errorMiddleware);

// app.get('*', (req, res) => {
//   return res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
// })

app.listen(PORT, () => {
  console.log(`[SERVER] started listening @ ${PORT}`);
});
