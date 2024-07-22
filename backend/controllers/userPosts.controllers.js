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
        let isPostFromSameUser = await PostModel.findOne({user: request.user});



        let simple = await PostModel.find({})

        if(!isPostFromSameUser && simple?.length){
            return response.status(400).json({error: "You are not allowed to edit this post"})
        }


        let post = await PostModel.findOne({_id,user: request.user});

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


export const deleteBlogPosts = async(request, response) => {
    try {
        const {id} = request.params;

        const user = await Auth.findById(request.user._id?.toString());

        if(!user){
            return response.status(404).json({error: "User not found"})
        }
        let isDelFromSameUser = await PostModel.findOne({user: request.user});

        if(!isDelFromSameUser){
            return response.status(400).json({error: "You are not allowed to delete this post"})
        }
        


        const post = await PostModel.findOneAndDelete({_id: id});
  
        return response.status(200).json({message: "Post deleted"})

    } catch (error) {
        console.log("Error in deleteBlogPosts controller", error.message);

        return response.status(500).json({error: "Internal server error"})
    }
}