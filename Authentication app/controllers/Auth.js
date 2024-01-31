const bcrypt = require('bcrypt');

const User = require("../models/user");

const jwt = require("jsonwebtoken");
const { options } = require('../routes/user');

require("dotenv").config();

// signup route handler

exports.signUp = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User alread exist',
            })
        }

        // secure password

        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hasing password',
            })
        }

        // create db entry
        const user = await User.create({
            name, email, password: hashPassword, role
        })

        return res.status(200).json({
            success: true,
            message: "Entry create succesfuul"
        })

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User can not be registered, please try again"
        })
    }


}

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).json({
                success: false,
                message: "fill email and password"
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not registered"
            })
        }

        // verify password and genertate jwt token
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        }

        if (await bcrypt.compare(password, user.password)) {

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })
            user = user.toObject();
            user.token = token;
            user.password = undefined;



            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Loged in succesfully",
            })

        }
        else {
            return res.status(401).json({
                success: false,
                message: "password incorrect"
            })
        }


    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User can not be registered, please try again"
        })
    }


}