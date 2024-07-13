import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectToMongo from './db/connectToMongo.js';
import postsRouter from './routes/posts.routes.js';

const PORT = 8081;

const app = express();
app.use(express.json());
app.use('/', postsRouter)


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    connectToMongo();
})



