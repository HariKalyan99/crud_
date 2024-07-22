import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
import express from 'express';
import connectToMongo from './db/connectToMongo.js';
import postsRouter from './routes/posts.routes.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';

const PORT = 8081;

const app = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRouter);


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    connectToMongo();
})



