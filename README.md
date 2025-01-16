---

# LaravelProject-API

This is the API documentation for the Laravel project.

---

## Requirements

Ensure the following are installed on your system:  
- **Node.js**  
- **Postman**  
- **MySQL**  

---

## Installation Guide

### Clone the Repository

Use the following command to clone the repository:  
```bash
git clone https://github.com/Brent-Devroey/laravelProject-API.git
```

### Install Dependencies

Navigate to the root directory and install the required dependencies:  
```bash
npm install
```

### Configure the `.env` File

1. Create a `.env` file in the root directory. If there’s a `.env.example` file, duplicate it and rename it to `.env`.  
2. Add the following environment variables to configure your database and server:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=project
DB_USERNAME=root
DB_PASSWORD=[Your Password]
PORT=3000
```
---

## Run the Server

Start the server with the following command:  
```bash
node server.js
```

### Verify the Server
1. Open your browser and go to `http://localhost:3000`. You should see a response indicating the server is running.

---


## Sources

Here are the references used during the development process:  
- **Validation Function Improvement**: [ChatGPT Resource](https://chatgpt.com/share/6788664f-78e4-800f-80ae-171dc2be64f1)  
- **Postman Route Issue**: [ChatGPT Resource](https://chatgpt.com/share/67886664-3ee4-800f-a00b-985afe91ce9a)  
- **User API Services Setup**: [ChatGPT Resource](https://chatgpt.com/share/678866f6-b230-800f-ba5a-9a537bd8c6c4)
- **MySQL connection issue fix**: [ChatGPT Resource](https://chatgpt.com/share/6788691e-5db8-800f-9544-7b8668207f75)

---
