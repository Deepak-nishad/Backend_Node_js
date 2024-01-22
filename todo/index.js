const express = require("express");
const getTodo = require("./controllers/getTodo");
const updateTodo = require("./controllers/updateTodo");
// const getTodoById = require("./controllers/getTodo");

const app = express();
require("dotenv").config();


const Port = process.env.Port || 4000;
console.log(Port)

// middleware to parse the json request body

app.use(express.json());

const todoRoutes = require("./routes/todos");

app.use("/api/v1", todoRoutes);


app.listen(Port, () => {
    console.log(`server is running on successfully ${Port}`);
})

// connect to db

const dbconnect = require("./config/database");

dbconnect();

app.get("/", (req, res) => {
    res.send(`<h1> This is home page </h1>`)
})