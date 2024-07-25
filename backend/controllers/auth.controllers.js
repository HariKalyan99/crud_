import { generateTokenAndCookie } from "../lib/utils/generateTokenAndSetCookie.js";
import Auth from "../models/auth.model.js";
import bcrypt from 'bcryptjs';



export const postSignUp = async(request, response) => {
    try {
        const {email, username, fullname, password} = request.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return response.status(400).json({error: "Invalid email format"});
        }

        const existUser = await Auth.findOne({username});


        if(existUser){
            return response.status(400).json({error: "Username is already taken"});
        }

        const existingEmail = await Auth.findOne({email});

        if(existingEmail){
            return response.status(400).json({error: "Email already exist"})
        }


        if(password.length < 6){
            return response.status(400).json({error: "Password must be atleast 6 charecters"})
        }


        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new Auth({
            fullname,
            username,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateTokenAndCookie(newUser._id, response);
            

            await newUser.save();

            return response.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
            })
        }else{
            return response.status(400).json({message: "Invalid user data"})
        }


    } catch (error) {
        console.log('Error in postSignUp controller', error.message);
        return response.status(500).json({error: "Internal server error"})
    }
}


export const postLogin = async(request, response) => {
    try {   
        const {username, password} = request.body;

        const user = await Auth.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return response.status(400).json({error: "Invalid username or password"})
        }

        generateTokenAndCookie(user._id, response);

        return response.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
        })

    } catch (error) {
        console.log("Error in the postLogin controller", error.message);
        return response.status(500).json({error: "Internal server error"})
    }
}

