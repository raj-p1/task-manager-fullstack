const BASE_URL = "http://localhost:5000/tasks"

//Fetch all tasks from the backend (GET)
export async function getTasks() {
     const response = await fetch(BASE_URL);
       if(!response.ok){
        throw new Error("Failed to fetch tasks");
       }
       return response.json();
}

//Create a new task (POST)
export async function createTask(task) {
     const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task),
     });
        if(!response.ok){
            throw new Error("Failed to create task");
        }
        return response.json();
}

//Edit a task (Update, PUT)
export async function updateTask(id, task) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
             "Content-Type": "application/json"
        },
        body: JSON.stringify(task),
    });
    if(!response.ok){
            throw new Error("Failed to update task");
        }
        return response.json();
}

//Delete a task (DELETE)
export async function deleteTask(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if(!response.ok){
            throw new Error("Failed to delete task");
        }
        return response.json();
}

//Toggle a completed status of a task (PUT)
export async function toggleTask(task) {
    const response = await fetch(`${BASE_URL}/${task._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
    if(!response.ok){
            throw new Error("Failed to toggle task");
        }
        return response.json();
}
