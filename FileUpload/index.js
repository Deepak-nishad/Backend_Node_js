const express = require("express");
const fileUpload = require('express-fileupload');
const { connect } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const app = express();

require("dotenv").config();

//  app middleware

app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const PORT = process.env.Port || 5000;

const FileUpload = require("./routes/FileUpload");
app.use("/api/v1/upload", FileUpload);







cloudinaryConnect();
connect();

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
})