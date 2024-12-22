
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));

// Middleware
app.use(json());
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// Routes

app.use("/api/v1/users", userRouter)

export default app;
