import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    fullname: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    email: {type: String, required: true, unique: true},
}, {timestamps: true})



const AuthModel = mongoose.model('Auth', authSchema);

export default AuthModel;