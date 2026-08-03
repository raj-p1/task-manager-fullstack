import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();


app.get("/tasks", (req,res) => {
    res.json([
        {
            id: 1,
            title: "Learn Express",
            priority: "Low",
            completed: false, 
        },
    ]);
})

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
});