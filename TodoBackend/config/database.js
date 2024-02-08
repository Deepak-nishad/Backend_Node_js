const mongoose = require('mongoose');
require("dotenv").config();

const dbconnect = () => {
    mongoose.connect(process.env.DatabaseUrl)
        .then(() => { console.log("db connection succesfull") })
        .catch((error) => {
            console.log("Issue in db coonection");
            console.error(error.message)
            process.exit(1);
        })
}

module.exports = dbconnect;