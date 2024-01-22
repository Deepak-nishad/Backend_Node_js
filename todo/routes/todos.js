const express = require("express");
const router = express.Router();

// controller import
const { createTodo } = require("../controllers/createTodo.js")
const { getTodo, getTodoById } = require("../controllers/getTodo.js")
const { updateTodo } = require("../controllers/updateTodo.js")
const { deleteTodo } = require("../controllers/deletetodo.js")

// define Api

router.post("/createTodo", createTodo);
router.get("/getTodos", getTodo);
router.get("/getTodoById/:id", getTodoById);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);
module.exports = router;

