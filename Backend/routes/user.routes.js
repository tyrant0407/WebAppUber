import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { body} from "express-validator";


const router = Router();

router.post('/register',
    body("fullName.firstName").notEmpty().isLength({min:2}).withMessage("First Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().isLength({min:4}).withMessage("Password must be at least 4 characters long"),
    userController.registerUser
)




export default router;
