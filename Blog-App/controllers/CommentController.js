const Comment = require("../models/CommentModel");

const Post = require("../models/PostModel");


exports.createComment = async (req, res) => {
    try {
        // fetch data from request body 
        const { post, user, body } = req.body;

        // create comment object
        const comment = new Comment({
            post, user, body
        })

        console.log(comment);
        // save the new comment object into the db 
        const savedComment = await comment.save();
        console.log(savedComment)

        // Find the Post By Id and the new comment to its comment array 
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } },
            { new: true })
            .populate("comments") //Populates the comment array with the comments document
            .exec();


        res.json({
            Post: updatedPost,
        })
    }
    catch (err) {
        return res.status(500).json({
            error: "Error while creating comment",
        })
    }
}