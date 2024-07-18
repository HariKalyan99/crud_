import Auth from "../models/auth.model.js";
import PostModel from "../models/posts.model.js"

export const getPosts = async(request, response) => {
    try {
        const posts = await PostModel.find();
        return response.status(200).json(posts)
    } catch (error) {
        console.log("Error in getPosts controller", error)
    }
}


export const addBlogPosts = async(request, response) => {
    try {
        const {title, userId, body, tags, reactions, views} = request.body;
        const user_id = request.user._id?.toString();

        const exists = await Auth.findById(user_id);

        if(!exists){
            return response.status(400).json({error: "User not found"});
        }

        const newPost = new PostModel({title, user: user_id, userId, body, tags, reactions, views})

        await newPost.save();
        return response.status(201).json(newPost)
    } catch (error) {
        console.log("Error in the addBlogPost controller", error.message);
        return response.status(500).json({error: "Internal server error"})
    }
}


export const updateBlogPosts = async(request, response) => {
    try {
        const {title, userId, body, tags, reactions, views, _id} = request.body;

        let user = await Auth.findById(request.user._id);

        if(!user){
            return response.status(404).json({error: "User not found"})
        }
        let post = await PostModel.findOne({_id});

        if(!post){
            return response.status(404).json({error: "Post not found"})
        }

        post.title = title || post.title,
        post.userId = userId || post.userId,
        post.body = body || post.body
        post.tags = tags || post.tags
        post.reactions = {...reactions} || post.reactions
        post.views = views || post.views

        post = await post.save();
        return response.status(200).json(post);
    } catch (error) {
        console.log("Error in the updateBlogPosts controller", error.message);
        return response.status(500).json({error: "Internal server error"})        
    }
}