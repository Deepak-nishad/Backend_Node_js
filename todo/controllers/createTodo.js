// CommonJS syntax
const Todo = require("../models/Todo");

// const {Todo} = require("../models/Todo");


// route handler
exports.createTodo = async (req, res) => {
    try {
        //extract title and desxcription from reauest body
        const { title, description } = req.body;
        console.log(title);
        console.log(description);
        //create a new Todo Obj and insert in DB
        const response = await Todo.create({ title, description });
        console.log(response, 16)
        //send a json response with a success flag
        res.status(200).json(
            {
                success: true,
                data: response,
                message: 'Entry Created Successfully'
            }
        );
    }
    catch (err) {
        res.status(500)
            .json({
                success: false,
                data: "internal server error",
                message: err.message,
            })
    }
}


