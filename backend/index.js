import 'dotenv/config';
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
    if (!fullName) {
        return res.status(400).json({ error: true, message: "Full Name is Require" })
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is Require" })
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is Require" })
    }

    const isUser = await User.findOne({ email: email })
    if (isUser) {
        return res.json({
            error: true,
            message: "User Already Exist"
        });
    }
    const user = new User({
        fullName,
        email,
        password,
    });
    await user.save();

    const accessToken = jwt.sign({ user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3600m" });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful"
    })
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is Require" })
    }
    if (!password) {
        return res.status(400).json({ message: "password is Require" })
    }

    const userInfo = await User.findOne({ email: email });
    if (!userInfo) {
        return res.status(400).json({ message: "user not found" })
    }
    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo }
        const accessToken = jwt.sign(
            user,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3600m" }
        )
        return res.json({
            error: "false",
            message: "Login Successful",
            email,
            accessToken
        })
    } else {
        return res.status(400).json({
            error: true,
            message: "invalid credentials"
        })
    }
})

app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const isUser = await User.findOne({ _id: user._id });
    if (!isUser) {
        return res.sendStatus(401);
    }
    return res.json({
        user: { fullName: isUser.fullName, email: isUser.email, "_id": isUser._id, createdOn: isUser.createdOn },
        message: ""
    })
})





app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body
    const { user } = req.user

    if (!title) {
        return res.status(400).json({
            error: true,
            message: "Title is required"
        })
    }
    if (!content) {
        return res.status(400).json({
            error: true,
            message: "Content is required"

        })
    }
    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id
        })
        await note.save();
        return res.json({
            error: false,
            note,
            message: "Note added success"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error,

        })
    }

});

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res.status(400).json({
            error: true,
            message: "No Changes Provided"
        })
    }
    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not Found"
            })
        }
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Updated Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

app.get("/all-notes", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 })
        return res.json({
            error: false,
            notes,
            message: "All Notes Retrieved Successfully"
        })
    } catch (error) {
        return res.json({
            error: true,
            message: "ERROR"
        })
    }
})

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;
    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            })
        }
        await Note.deleteOne({ _id: noteId, userId: user._id });
        return res.json({
            error: false,
            message: "Note Deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})


app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not Found"
            })
        }
        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Updated Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

app.get("/search-notes/", authenticateToken, async (req, res) => {
    const {user}= req.user;
    const {query} = req.query;
    if(!query){
        return res.status(400).json({
            error:true,
            message:"Search query is Required"
        })
    }
    try {
        const matchingNotes = await Note.find({
            userId:user._id,
            $or: [
                {title: {$regex: new RegExp(query, "i")}},
                {content: {$regex: new RegExp(query, "i")}}, 
            ]
        })
        return res.json({
            error:false,
            notes:matchingNotes,
            message:"Notes matching the search query retrieved successfully"
        })
    } catch (error) {
        return res.status(500).json({error: true, message: "Internal Server Error"})
    }
})





app.listen(8000, () => {
    console.log("Server is running on port 8000...")

})
export default app;