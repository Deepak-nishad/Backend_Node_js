const express = require("express");
const router = express.Router();

// import controller

const { likePost, unlikePost } = require("../controllers/LikeController");
const { createComment } = require("../controllers/CommentController");
const { CreatePost, getAllPost } = require("../controllers/PostController");

// MApping Create

router.post("/Like", likePost)
router.post("/unLike", unlikePost)
router.post("/createComment", createComment)
router.post("/createPost", CreatePost)
router.post("/getAllPost", getAllPost)



// exports

module.exports = router;