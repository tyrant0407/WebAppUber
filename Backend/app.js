import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connnectDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
connnectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/users",userRoutes);


export default app;