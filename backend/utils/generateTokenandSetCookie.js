import  jwt  from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config();

export const generateTokenandSetCookie = (res, id) => {
    const token = jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: '7d'
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  //Xss prevention from this
        sameSite: 'strict', //csrf prevention from this
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}