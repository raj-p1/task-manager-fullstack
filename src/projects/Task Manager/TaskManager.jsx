import { useEffect, useState } from "react";
import "./TaskManager.css";
import { createTask, getTasks, updateTask, deleteTask, toggleTask } from "../../api/taskApi.js";

export default function TaskManager() {

    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [tasks, setTasks] = useState([]);
    const [searchTask, setSearchTask] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");

    async function fetchTasks() {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    // Add a new task or update an existing task
    async function handleAddTask() {
        // Prevent adding an empty task
        if (task.trim() === "") return;
        try {
            if (editTaskId !== null) {
                await updateTask(editTaskId, {
                    title: task,
                    priority,
                });
                setEditTaskId(null);
            }
            else {
                await createTask({
                    title: task,
                    priority,
                });
            }
            await fetchTasks();
            setTask("");
            setPriority("Medium");
        } catch (error) {
            console.error("Failed to save task:", error);
        }
    }

    // Delete a task
    async function handleDeleteTask(id) {
        try {
            await deleteTask(id);
            await fetchTasks();
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    }

    // Mark task as completed or incomplete
    async function handleToggleComplete(currentTask) {
        try {
            await toggleTask({
                ...currentTask,
                completed: !currentTask.completed,
            });
            await fetchTasks();
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    }

    // Load selected task into input for editing
    function handleEditTask(id) {
        const taskToEdit = tasks.find(currentTask => currentTask._id === id);
        setTask(taskToEdit.title);
        setPriority(taskToEdit.priority);
        setEditTaskId(id);
    }

    // Search and filter tasks
    const filteredTasks = tasks.filter(currentTask => {
        const matchesSearch = currentTask.title
            .toLowerCase()
            .includes(searchTask.toLowerCase());

        if (filterStatus === "active") {
            return !currentTask.completed && matchesSearch
        }
        if (filterStatus === "completed") {
            return currentTask.completed && matchesSearch
        }
        return matchesSearch;
    });

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>
            {/* Task Input */}
            <div className="input-section">
                <input
                    type="text"
                    value={task}
                    placeholder="Add a task.."
                    onChange={e => setTask(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAddTask();
                        }
                    }}
                />

                <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <button onClick={handleAddTask}>
                    {editTaskId !== null ? "Update" : "Add"}
                </button>
            </div>

            {/* Search */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search a task..."
                    value={searchTask}
                    onChange={(e) => setSearchTask(e.target.value)}
                />
            </div>

            {/* Filter */}
            <div className="filter-section">

                <button
                    className={filterStatus === "all" ? "active" : ""}
                    onClick={() => setFilterStatus("all")}
                >
                    All
                </button>

                <button
                    className={filterStatus === "active" ? "active" : ""}
                    onClick={() => setFilterStatus("active")}
                >
                    Active
                </button>

                <button
                    className={filterStatus === "completed" ? "active" : ""}
                    onClick={() => setFilterStatus("completed")}
                >
                    Completed
                </button>

            </div>

            {/* Empty State */}
            {filteredTasks.length === 0 && (
                <p className="empty-message">No tasks found</p>
            )}

            {/* Task List */}
            <ul className="task-list">
                {filteredTasks.map((currentTask) => (
                    <li key={currentTask._id}>
                        <input
                            type="checkbox"
                            aria-label="Mark task as completed"
                            checked={currentTask.completed}
                            onChange={() => handleToggleComplete(currentTask)}
                        />
                        <span className={currentTask.completed ? "task-title completed" : "task-title"}>{currentTask.title}</span>
                        <span className={`priority ${currentTask.priority.toLowerCase()}`}>{currentTask.priority}</span>
                        <div className="actions">
                            <button
                                onClick={() => handleEditTask(currentTask._id)}>Edit</button>
                            <button onClick={() => handleDeleteTask(currentTask._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    )
}