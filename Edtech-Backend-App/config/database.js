const mongoose = require("mongoose");
require("dotenv").config();


const DbConnect = () => {
    mongoose.connect(process.env.DatabaseUrl)
        .then(console.log("Db with successfully"))
        .catch((err) => {
            console.log("Db facing error");
            console.log(err);
            process.exit(1);
        })
}
module.exports = DbConnect;


