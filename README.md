# Task Manager Full Stack

A full-stack Task Manager application built with the MERN stack. The project demonstrates complete CRUD functionality using React on the frontend and Express, Node.js, MongoDB, and Mongoose on the backend. The frontend communicates with the backend through a dedicated API service layer using Fetch.
## Features

* Create a new task
* View all tasks
* Update existing tasks
* Delete tasks
* Mark tasks as completed or incomplete
* Search tasks
* Filter tasks by:

  * All
  * Active
  * Completed
* Persistent data using MongoDB
* RESTful API architecture
* MVC backend structure
* Modular frontend API service
* Fetch-based API communication

## Tech Stack

### Frontend

* React
* JavaScript (ES6+)
* Fetch
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Project Structure

```text
task-manager-fullstack
│
├── server
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── .env
│   └── index.js
│
├── src
│   ├── api
│   │   └── taskApi.js
│   └── projects
│       └── Task Manager
│           ├── TaskManager.jsx
│           └── TaskManager.css
```

## API Endpoints

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/tasks`     | Fetch all tasks |
| POST   | `/tasks`     | Create a task   |
| PUT    | `/tasks/:id` | Update a task   |
| DELETE | `/tasks/:id` | Delete a task   |

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd ..
npm install
npm run dev
```

## Environment Variables

Backend `.env`

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Author

Raj Patel
