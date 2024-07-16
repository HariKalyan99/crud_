import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectToMongo from './db/connectToMongo.js';
import postsRouter from './routes/posts.routes.js';
import cookieParser from 'cookie-parser';

const PORT = 8081;

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/post', postsRouter)


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    connectToMongo();
})



