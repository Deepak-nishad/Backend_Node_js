const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DataBaseUrl)
        .then(() => {
            console.log("Db connected successfully");
        })
        .catch((err) => {
            console.log("Db connection issue");
            console.error(err);
            process.exit(1);
        })
}