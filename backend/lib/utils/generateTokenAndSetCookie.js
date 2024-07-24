import jwt from 'jsonwebtoken';

export const generateTokenAndCookie = (userId, response) => {
    console.log(userId)
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: '10d'
    })


    response.cookie('jwt', token, {
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return token
}
