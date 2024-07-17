import jwt from 'jsonwebtoken';
import AuthModel from '../models/auth.model.js';

export const validateAuthorization = async(request, response, next) => {
    try {
        const token = request.cookies.jwt;

        if(!token){
            return response.status(403).json({error: "Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


        if(!decoded){
            return response.status(401).json({message: "Unauthorized; Invalid token"})
        }

        const user = await AuthModel.findById(decoded.userId).select("-password");

        if(!user){
            return response.status(404).json({error: "User not found"})
        }


        request.user = user;

        next();
    } catch (error) {
        console.log("Error in the validateAuthorization middleware", error.message);
        return response.status(500).json({error: "Internal server error"})
    }
}



