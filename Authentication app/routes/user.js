const express = require("express");

const router = express.Router();

const { login, signUp } = require("../controllers/Auth");

const { auth, isStudent, isAdmin } = require("../middleware/auth")


router.post("/Login", login);
router.post("/signUp", signUp);


router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: `<h1>welcome to  student route`
    })
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: `<h1>welcome to  student route`
    })
})

module.exports = router;