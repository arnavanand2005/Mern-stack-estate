import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        default : "https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80"
    }}, {timestamps : true});

const User = mongoose.model("User", userSchema);

export default User;

