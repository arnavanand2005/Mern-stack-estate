import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {errorHandler} from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
        username,
        email,
        password : hashedPassword
    });
    try{
        await newUser.save();
        res.status(201).json({
            success: true,
             message: "User registered successfully!" });  
    }
    catch(error){
        next(errorHandler(500,"Failed to register user"));
        }
 };

 export const signin = async (req, res, next) => {
    const {username, password} = req.body;
    try{
        const validUser = await User.findOne({username});
        if(!validUser){
            return next(errorHandler(404,"User not found"));
        }
        const isPasswordValid = await bcrypt.compare(password, validUser.password);
        if(!isPasswordValid){
            return next(errorHandler(401,"Invalid password"));
        };
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
        }).status(200).json({
            success: true,
             message: "User signed in successfully!" });
    } 
    catch (error) {
        next(error);
    }
 }

 export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const { password : pass , ...rest } = user._doc
            res
            .cookie("access_token", token, {
                httpOnly : true
            })
            .status(200)
            .json(rest)
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            const newUser = new User ({
                username : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email : req.body.email,
                password : hashedPassword,
                avatar : req.body.photo
            });
            await newUser.save()
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const { password : pass , ...rest } = newUser._doc
            res
            .cookie("access_token", token, {
                httpOnly : true
            })
            .status(200)
            .json(rest)

        }

    }
    catch(error) {
        next(error)
    }

 }

