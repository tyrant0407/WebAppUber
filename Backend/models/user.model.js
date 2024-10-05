import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[2,"First Name must be at least 2 characters long"],
        },
        lastName:{
            type:String,
            minlength:[2,"Last Name must be at least 2 characters long"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[4,"Email must be at least 4 characters long"],
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    }
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
    return token;
}

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model("user",userSchema);

export default userModel;
