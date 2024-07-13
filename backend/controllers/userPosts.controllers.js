import PostModel from "../models/posts.model.js"

export const getPosts = async(request, response) => {
    try {
        const posts = await PostModel.find();
        return response.status(200).json(posts)
    } catch (error) {
        console.log("Error in getPosts controller", error)
    }
}

