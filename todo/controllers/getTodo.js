// CommonJS syntax
const Todo = require("../models/Todo");

// route handler
exports.getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({});


        res.status(200).json(
            {
                success: true,
                data: todos,
                message: 'data fetched Successfully'
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

exports.getTodoById = async (req, res) => {
    try {

        const id = req.params.id;
        const todos = await Todo.findById({ _id: id });
        if (!todos) {
            return res.status(404).json({
                success: false,
                message: 'no data found'
            })
        }

        res.status(200).json(
            {
                success: true,
                data: todos,
                message: 'data fetched Successfully'
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


