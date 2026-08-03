import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js"
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
//Middleware between req.body and json request bodies
app.use(express.json());
app.use("/tasks", taskRoutes);
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
