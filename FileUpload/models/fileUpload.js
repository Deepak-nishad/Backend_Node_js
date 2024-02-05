const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    tags: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
})


// post middleware
FileSchema.post("save", async function (doc) {
    try {
        // console.log(doc);

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAil_USER,
                pass: process.env.MAIl_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: 'Deepak (Monster)', // sender address
            to: doc.email, // list of receivers
            subject: "Hello je ", // Subject line
            text: "File Upload On cloundinary", // plain text body
            html: `<b>Hello  </b><p> Your Photo Uploaded on media server</p> View Here: <a href = "${doc.imageUrl}">${doc.imageUrl}</a>` // html body
        });

        console.log(info);

    } catch (error) {
        console.error(error);
    }
})

const File = mongoose.model("File", FileSchema);
module.exports = File;