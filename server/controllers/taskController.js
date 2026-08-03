import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};
