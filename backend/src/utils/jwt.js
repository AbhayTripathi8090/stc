import jwt from "jsonwebtoken";

export const generateToken = (userId) =>{
    return jwt.sign(
        {
            userId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    )
}

export const varifyTo = (token) =>{
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    )
}