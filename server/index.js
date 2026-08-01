import express from "express";

const app = express();
const PORT = 5000;

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