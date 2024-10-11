import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult} from "express-validator";

export const registerUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
 
    try {
        const {fullName,email,password} = req.body;
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({
            firstName:fullName.firstName,
            lastName:fullName.lastName,
            email:email,
            password:hashedPassword});
        const token = user.generateAuthToken();
        res.status(201).json({message:"User created successfully",user,token});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}