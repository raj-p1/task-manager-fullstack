import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import Task from "./models/Task.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();
//Middleware between req.body and json request bodies
app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
