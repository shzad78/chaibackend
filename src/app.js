import dotenv from 'dotenv'
dotenv.config({ path: './.env' });  // Explicitly specify the path to .env file

import express, { json, urlencoded } from 'express';
import connectDB from './db/index.js';
import cors from 'cors';

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Connect to database
connectDB()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
