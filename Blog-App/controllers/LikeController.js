// Import Models
const Post = require("../models/PostModel");
const Like = require("../models/LikeModel");

// Like a Post
exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body;
        const like = new Like({
            post,
            user,
        });
        console.log(like);
        const savedLike = await like.save();
        console.log(savedLike);

        // Update Post Collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: savedLike._id } },
            { new: true }
        )
            .populate("likes")
            .exec();

        console.log(updatedPost);

        res.json({
            post: updatedPost,
        });
    } catch (err) {
        return res.status(500).json({
            error: "Error While Like Post",
        });
    }
};

// Unlike a Post
exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        // find and delete the from like collection
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });
        console.log(deletedLike)

        // update the post collection
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $pull: { likes: deletedLike._id } },
            { new: true }
        );
        console.log(updatedPost);
        res.json({
            post: updatedPost,
        });
    } catch (err) {
        return res.status(500).json({
            error: "Error While unLike Post",
        });
    }
};
