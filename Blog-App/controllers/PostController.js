const Post = require("../models/PostModel");

exports.CreatePost = async (req, res) => {

    try {
        const { title, body } = req.body;
        // create comment object
        const post = new Post({
            title, body
        })

        console.log(post);
        const savePost = await post.save();
        console.log(savePost);
        res.json({
            post: savePost,
        })


    }
    catch (error) {
        return res.status(500).json({
            error: "Error while creating Post",
        })
    }
};

exports.getAllPost = async (req, res) => {

    try {
        const posts = await Post.find().populate("comments").exec();
        res.json({
            posts,
        })
    }
    catch (error) {
        return res.status(500).json({
            error: "Error while fetching post",

        })
    }
};