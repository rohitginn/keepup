import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB }  from './config/db.js';
import authRoutes from './routes/auth.routes.js'
import todoRoutes from './routes/todo.routes.js'
import cookieParser from 'cookie-parser';

config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)

app.get('/', (req, res) => {
    res.send('Todo API is running!');
});

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
