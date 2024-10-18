const nodemailer = require("nodemailer");

const mailSender = async (email, ttile, body) => {
    try {
        // console.log(doc);

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAil_USER,
                pass: process.env.MAIl_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: 'StudyNotion', // sender address
            to: `${email}`, // list of receivers
            subject: `${ttile}`, // Subject line

            html: `${body}`, // html body
        });

        console.log(info);
        return info;

    } catch (error) {
        console.error(error);
    }
}

module.exports = mailSender;