import express from 'express';
import { getPosts,addBlogPosts } from '../controllers/userPosts.controllers.js';
import { validateAuthorization } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get("/allPosts", getPosts);
router.post("/add",validateAuthorization, addBlogPosts)



export default router;