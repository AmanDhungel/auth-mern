import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateTokenandSetCookie } from "../utils/generateTokenandSetCookie.js";
import {sendForgotPasswordMail, sendResetPasswordMail, sendVerificationEmail, sendWelcomeMail} from '../mailtrap/email.js'
import crypto  from "crypto";

export const signup = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        // Check if all fields are filled
        if (!email || !name || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        // Check if the user already exists
        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification token and set expiration time
        const verificationToken = Math.floor((Math.random() * 900000) + 100000).toString();

        // Create a new user
        const user = new User({ 
            email,
            name, 
            password: hashedPassword, 
            verificationToken, 
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        // Save the user to the database
        await user.save();

        // Generate JWT and set it in a cookie
        generateTokenandSetCookie(res, user._id);
        await sendVerificationEmail(user.email, user.verificationToken);
        // Respond with success
        res.status(201).json({ success: true, message: "User created successfully", user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            verificationToken: user.verificationToken,
            verificationTokenExpiresAt: user.verificationTokenExpiresAt,
        }});
    } catch (err) {
        // Handle any errors
        res.status(500).json({ message: err.message });
    }
};

export const verifyEmail =  async(req, res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt : Date.now()}
        })

        if(!user){
            return res.status(400).json({ success: false, message: 'Invalid or expired verification token'});
        }

        user.isVerified = true,
        user.verificationToken = undefined,
        user.verificationTokenExpiresAt = undefined,

        await user.save();

        await sendWelcomeMail(user.email, user.name);
        

        res.status(200).json({ message : 
            "Email verified successfully"
        })
    } catch (error) {
        console.log("Error sending mail", error);
        throw new Error(`Error: ${error}`);
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(401).json({ success: false, message: 'Cannot find the user with this name'});
        }
        
        const comparedPassword = await bcrypt.compare(password, user.password);
        if(!comparedPassword){
            return res.status(401).json({ success: false, message: 'Invalid username or password'});
        }
    
       const token = generateTokenandSetCookie(res, user._id)
        user.lastLogin = Date.now();
    
        await user.save()
        
        res.status(200).json({message: "login successful", token: token})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  

};

export const forgotPassword = async(req, res) => {

    const {email} = req.body;
    const user = await User.findOne({email});
    
    if(!user){
        return res.status(401).json({ success: false, message: 'Cannot find the user with this name'});
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    
    await user.save();
    
    sendForgotPasswordMail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`); 
    res.status(200).json({ message: "Email sent successfully" });
};


export const logout = (req, res) => {
        res.clearCookie("token");
    res.status(200).json('Logout successfull');
};


export const resetPassword = async(req, res) => {
    const {password} = req.body;
    const {token} = req.params;
    const user = await User.findOne({resetPasswordToken: token});
    
    if(!user){
        return res.status(401).json({ success: false, message: 'Cannot find the user with this token or token already expired'});
    }
     
    const newPassword = await bcrypt.hash(password, 10);
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save()
    
    sendResetPasswordMail(user.email)
    res.status(200).json("Password Reset Successful")

};   

export const checkAuth = async(req, res)=>{
    try {
        console.log("userID =", req.userId)
        const user = await User.findById(req.userId).select("-password");
        console.log("user =", user)
        if(!user){
            return res.status(400).json({success: false, message: "user not found"});
        }
        res.status(200).json({success : true, user});
    } catch (error) {
        res.status(400).json({success: false, message: "Invalid token"});
    }

}