import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
    likes: {type: Number, default: 10},
    dislikes: {type: Number, default: 10}
})

const postsSchema = new mongoose.Schema({
    userId: {type: Number, required: true},
    title: {type: String, required: true, maxlength: 100},
    body: {type: String, required: true, maxlength: 500},
    tags: [String],
    reactions: {reactionSchema},
    views: {type: Number, default: 100}
})

const PostModel = new mongoose.model('Posts', postsSchema);


export default PostModel;