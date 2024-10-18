const User = require("../models/User");
const OTP = require("../models/Otp");
const Profile = require("../models/Profile");

const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUser = await User.findOne({ email });

        if (checkUser) {
            return res.status(401).json({
                success: true,
                message: "User already resgistered"
            })
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        console.log("otp is", otp);

        var result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            result = await OTP.findOne({ otp: otp });
        }

        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: "Otp sent successfully",
            otp,
        })


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

exports.signUp = async (req, res) => {
    try {

        const { firstname, lastname, email, password, confirmPassword, accountType, otp } = req.body;

        if (!firstname || !lastname || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password does not match"
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user is already registerd"
            })
        }

        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);

        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "Otp not found"
            })
        }
        else if (otp !== recentOtp) {
            return res.status(400).json({
                success: false,
                message: "Invalid otp"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })
        const user = await User.create({
            firstname, lastname, email, contactNumber, password: hashedPassword, accountType, additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
        })

        return res.status(200).json({
            success: true,
            message: "User is registerd succesfully",
            user,
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "User is not registered, try again"
        })
    }

}

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).json({
                success: false,
                message: " All fields are required fill email and password"
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


        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }

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






