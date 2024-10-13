import userModel from "../models/user.model.js";

export const createUser = async ({firstName,lastName,email,password})=>{
    if(!firstName || !email || !password){
        throw new Error("All fields are required");
    }
   try {
    
    const user = await userModel.create({
        fullName:{firstName,lastName},
        email:email.toLowerCase(),
        password:password});
    return user;
   } catch (error) {
    console.log(error);
   }
}