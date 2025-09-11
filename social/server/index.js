import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';



const app = express();
const PORT = process.env.PORT || 8001;

connectDB();

// Middleware

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL

  credentials: true, // Allow cookies to be sent
}));



// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the social server!');
});

// Routes
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start server
app.listen(PORT, () => {

  console.log(`Server is running on http://localhost:${PORT}`);
});