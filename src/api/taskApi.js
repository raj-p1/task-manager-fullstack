import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


//Fetch all tasks from the backend (GET)
export async function getTasks() {
    const response = await axios.get(BASE_URL);
    return response.data;
}

//Create a new task (POST)
export async function createTask(task) {
    const response = await axios.post(BASE_URL,task);
    return response.data;
}

//Edit a task (Update, PUT)
export async function updateTask(id, task) {
    const response = await axios.put(`${BASE_URL}/${id}`, task);
    return response.data;
}

//Delete a task (DELETE)
export async function deleteTask(id) {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
}

//Toggle a completed status of a task (PUT)
export async function toggleTask(task) {
    const response = await axios.put(`${BASE_URL}/${task._id}`, task);
    return response.data;
}
