import { useState } from "react";
import "./TaskManager.css"

export default function TaskManager() {

    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [tasks, setTasks] = useState([]);
    const [searchTask, setSearchTask] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);
    const [filterStatus, setFilterStatus] = useState("All");

    // Add a new task or update an existing task
    function handleAddTask() {
        // Prevent adding an empty task
        if (task.trim() === "") return;

        // Update existing task
        if (editTaskId !== null) {
            setTasks(prevTask => prevTask.map((currentTask) => {
                if (currentTask.id === editTaskId) {
                    return {
                        ...currentTask,
                        title: task,
                        priority: priority,
                    };
                }
                return currentTask;
            }));
             // Exit edit mode
            setEditTaskId(null);
        }
        // Create a new task
        else {
            const newTask = {
                id: Date.now(),
                title: task,
                priority: priority,
                completed: false
            };
            setTasks(prevTask => [...prevTask, newTask]);
        }
        //Reset form
        setTask("");
        setPriority("Medium");
    }

    // Delete a task
    function handleDeleteTask(id) {
        setTasks(prevTask => prevTask.filter((currentTask) => currentTask !== id));
    }

    // Mark task as completed or incomplete
    function handleToggleComplete(id) {
        setTasks(prevTask => prevTask.map((currentTask) => {
            if (currentTask.id === id) {
                return {
                    ...currentTask,
                    completed: !currentTask.completed
                };
            }
            return currentTask;
        }));
    }

    // Load selected task into input for editing
    function handleEditTask(id) {
        const taskToEdit = tasks.find(currentTask => currentTask.id === id);
        setTask(taskToEdit.title);
        setPriority(taskToEdit.priority);
        setEditTaskId(id);
    }

    // Search and filter tasks
    const filteredTasks = tasks.filter(currentTask => {
        const matchesSearch = currentTask.title
            .toLowerCase()
            .includes(searchTask.toLowerCase());

        if (filterStatus === "Active") {
            return !currentTask.completed && matchesSearch
        }
        if (filterStatus === "Completed") {
            return currentTask.completed && matchesSearch
        }
        else {
            return matchesSearch;
        }
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
                    <li key={currentTask.id}>
                        <input
                            type="checkbox"
                            aria-label="Mark task as completed"
                            checked={currentTask.completed}
                            onChange={() => handleToggleComplete(currentTask.id)}
                        />
                        <span className={currentTask.completed ? "task-title completed" : "task-title"}>{currentTask.title}</span>
                        <span className={`priority ${currentTask.priority.toLowerCase()}`}>{currentTask.priority}</span>
                        <div className="actions">
                            <button
                                onClick={() => handleEditTask(currentTask.id)}>Edit</button>
                            <button onClick={() => handleDeleteTask(currentTask.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    )

}