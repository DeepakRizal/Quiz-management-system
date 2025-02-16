# Quizo - Quiz Management System

Quizo is a simple Quiz Management System where teachers can -create, edit, view, and delete quizzes-.

It is built using ""React (ShadCN UI) for the frontend"" and ""TypeScript with Express & MySQL for the backend"".

\*\* Features

- User login (static credentials, no JWT).
- Create, edit, delete quizzes.
- Responsive design using Tailwind CSS & ShadCN UI.
- API built with Express.js and MySQL.

**\*\*** Project Setup (Run Locally)

**\*\*** Clone the Repository\*\*

```sh
gh repo clone DeepakRizal/Quiz-management-system
```

//backend

##Set Up Environment Variables\*\*
Create a `.env` file in the `backend` folder and add the following:

```ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306
PORT=your_backend_port
```

To run this project backend(as it was giving an error(unrecognised file type because of typescript which is related to node version)), you need Node.js v19. If you don't have it installed, follow these steps:

1. Download and install NVM (Node Version Manager) for Windows.
2. Open a terminal and install Node.js v19:

--nvm install 19

)3Switch to Node.js v19:

--nvm use 19

\*\*Set Up MySQL Database
--Ensure that MySQL is installed and running on your system.

Open MySQL Workbench or a terminal and connect to your MySQL server.
--Create a new database:
---CREATE DATABASE your_database_name;

Create the required tables

CREATE TABLE users (
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);

CREATE TABLE quizzes (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
teacher_id INT,
FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);

cd backend
npm install # Install dependencies
npm run dev # Start the backend server

\*\*For frontend
Environment variables

VITE_API_URL=http://localhost:Your_Port/api

cd client
npm install
npm run dev

# 📌 API Documentation - Quizo Backend

## **1️ Authentication**

### **🔹 Login**

**URL:** `POST http://localhost:3000/api/auth/login`  
**Request Body:**

```json
{
  "username": "USERNAME",
  "password": "PASSWORD"
}

Response:
{
  "status": "success",
  "data": {
    "user": {
      "id": "ID",
      "username": "USERNAME",
      "password": "PASSWORD"
    }
  }
}

2️ Quiz Management
 Create a Quiz
URL: POST http://localhost:3000/api/quizzes

Request Body:
{
  "title": "TITLE",
  "description": "DESCRIPTION",
  "teacher_id": 1
}

Response:
{
  "message": "Quiz created successfully",
  "quizzes": {
    "result": {
      "fieldCount": 0,
      "affectedRows": 1,
      "insertId": 3,
      "info": "",
      "serverStatus": 2,
      "warningStatus": 0,
      "changedRows": 0
    }
  }
}

 Get All Quizzes
URL: GET http://localhost:3000/api/quizzes
Response:
{
  "status": "success",
  "data": [
    {
      "id": ID,
      "title": "TITLE",
      "description": "DESCRIPTION",
      "teacher_id": 1,
      "created_at": "TIME"
    },
    {
      "id": ID,
      "title": "TITLE",
      "description": "DESCRIPTION",
      "teacher_id": 1,
      "created_at": "TIME"
    }
  ]
}

 Get a Single Quiz
URL: GET http://localhost:3000/api/quizzes/:QUIZID
Response:
{
  "status": "success",
  "data": {
    "id": ID,
    "title": "TITLE",
    "description": "DESCRIPTION",
    "teacher_id": 1,
    "created_at": "TIME"
  }
}

Update a Quiz
URL: PUT http://localhost:3000/api/quizzes/:QUIZID
Request Body (same as create)

{
  "title": "NEW_TITLE",
  "description": "NEW_DESCRIPTION",
  "teacher_id": 1
}

Response:

{
  "status": "success",
  "data": {
    "id": ID,
    "title": "NEW_TITLE",
    "description": "NEW_DESCRIPTION",
    "teacher_id": 1,
    "created_at": "TIME"
  }
}

Delete a Quiz
URL: DELETE http://localhost:3000/api/quizzes/:QUIZID
Response:
{
  "status": "success",
  "message": "Quiz deleted successfully"
}


```
