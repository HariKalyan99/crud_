import express from 'express';
import { getPosts,addBlogPosts, updateBlogPosts, deleteBlogPosts } from '../controllers/userPosts.controllers.js';
import { validateAuthorization } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get("/allPosts", getPosts);
router.post("/add",validateAuthorization, addBlogPosts);
router.put("/update", validateAuthorization, updateBlogPosts);
router.delete("/delete/:id", validateAuthorization, deleteBlogPosts);



export default router;