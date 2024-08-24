import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
const token = req.cookies.token;
if(!token) return res.status(400).json({message: "Unathorized - this token doesnot match"})
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(!decoded) return res.status(400).json({message: "Unathorized - this token doesnot match"})
            req.userId = decoded.id
            next();
        } catch (error) {
            return res.status(400).json({message: "Unathorized - this token doesnot exist"}); 
        }
    
}

