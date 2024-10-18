const User = require("../models/User");
const mailSender = require("../utils/mailSender");

const bcrypt = require("bcrypt");
exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: "Your email is not registed with us"
            })

        }

        const token = crypto.randomUUID();

        const updatedDetails = await User.findOneAndDelete({ email: email }, { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 }, { new: true });
        const url = `http://localhost:3000/update-password/${token}`

        await mailSender(email, "Password reset link", `password Reset Link ${url}`);

        return res.json(
            {
                success: true,
                message: "Email sent suucessfully, Please try again"
            }
        )

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            suceess: false,
            message: "Something went wrong while reset password "
        })
    }
}

exports.resetPassword = async (req, res) => {

    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Password not match",
            })
        }

        const userDetails = await User.findOne({ token: token });

        // if no entry - invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: "token invalid",
            })
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "token is expired, please try again",
            })
        }

        const hashed = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ token: token }, { password: hashed }, { new: true },)

        return res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            suceess: false,
            message: "Something went wrong while reset password "
        })

    }

}