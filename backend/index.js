import 'dotenv/config';
import { config } from 'dotenv';
import mongoose from 'mongoose';

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error("Error connecting to DB:", err));

    import "./models/user.model.js"

import express from "express";
import cors from "cors";

import jwt from "jsonwebtoken";
import authenticateToken from './utilities.js';
import userModel from './models/user.model.js';
const User = userModel;
import noteModel from './models/note.model.js';
const Note = noteModel;



const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
)

app.get("/", (req, res) => {
    res.send({ data: "hello" })
})

app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName){
        return res.status(400).json({error:true, message:"Full Name is Require"})
    }
    if (!email){
        return res.status(400).json({error:true, message:"Email is Require"})
    }
    if(!password){
        return res.status(400).json({error:true,message:"Password is Require"})
    }

    const isUser = await User.findOne({email:email})
    if(isUser){
        return res.json({
            error:true,
            message:"User Already Exist"
        });
    }
    const user = new User ({
        fullName,
        email,
        password,
    });
    await user.save();

    const accessToken = jwt.sign({user},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"3600m"});

        return res.json({
            error: false,
            user,
            accessToken,
            message: "Registration Successful"
        })
});
app.post("/login",async (req,res) => {
    const {email,password}=req.body;
    if(!email){
        return res.status(400).json({message:"Email is Require"})
    }
    if(!password){
        return res.status(400).json({message:"password is Require"})
    }

    const userInfo = await User.findOne({email:email});
    if(!userInfo){
        return res.status(400).json({message:"user not found"})
    }
    if (userInfo.email == email && userInfo.password == password){
        const user = {user:userInfo}
        const accessToken = jwt.sign(
            user,
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"3600m"}
        )
        return res.json({
            error:"false",
            message:"Login Successful",
            email,
            accessToken
        })
    }else{
        return res.status(400).json({
            error:true,
            message:"invalid credentials"
        })
    }
})

app.post("/add-note",authenticateToken,async (req,res)=>{
    const {title, content, tags} = req.body
    const {user} = req.user

    if(!title){
        return res.status(400).json({
            error:true,
            message:"Title is required"
        })
    }

})

app.listen(8000,()=>{
    console.log("Server is running on port 8000...")
})
export default app;