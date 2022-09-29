const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const searchRoutes = require('./routes/searchRoutes.js');

const errorMiddleware = require('./middleware/errorMiddleware.js');

const connectDB = require('./db.js');

require('./db.js');

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


// const pathname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')));

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`[SERVER] started listening @ ${PORT}`);
});
