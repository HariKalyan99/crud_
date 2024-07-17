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


