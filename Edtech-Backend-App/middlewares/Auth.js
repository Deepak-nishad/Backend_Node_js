const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User")
exports.auth = (req, res, next) => {
    try {

        const token = req.header("Authorization").replace("Bearer ", "") || req.cookies.token || req.body.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "token missing"
            })
        }

        // verify the token

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "token is invalid",
            })
        }

        next();
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "something went wrong while verifying the token",
        })
    }
}

exports.isStudent = (req, res, next) => {
    try {

        if (req.user.accountType != "Student") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for student"
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role is not match",
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {

        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin"
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role is not match",
        })
    }
}