import TaskManager from "./projects/Task Manager/TaskManager"; 
import {createBrowserRouter} from "react-router";


export const router = createBrowserRouter([
  {
    path: "/",
    element : <TaskManager/>
  },
  
]);