const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expire: 5 * 60,
    }
});

async function sendVerification(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email from studynotion", otp)
        console.log("mail sent successfully", mailResponse)
    }
    catch (error) {
        console.log("Error occured while sending mails", error);
        throw error;
    }
}

OtpSchema.pre("save", async function (next) {
    await sendVerification(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", OtpSchema)
