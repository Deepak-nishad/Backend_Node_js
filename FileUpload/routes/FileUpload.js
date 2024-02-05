const express = require("express");

const router = express.Router();
const { localfileUpload, imageUpload, videoUpload, imageReducer } = require("../controllers/fileUpload")
router.post("/localfileUpload", localfileUpload)
router.post("/imageUpload", imageUpload)
router.post("/videoUpload", videoUpload)
router.post("/imageReducer", imageReducer)
module.exports = router;