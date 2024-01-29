const express = require("express");
require("dotenv").config();



const app = express();
const Port = process.env.Port || 5000;

app.use(express.json());

const blog = require("./routes/blog");
// console.log(blog);
app.use("/api/v1/", blog);


const dbconnect = require("./config/dataBase");
dbconnect();

app.listen(Port, () => {
    console.log("Server is runnning succesfuuly");
})


app.get("/", (req, res) => {
    res.send("This is home routes baby")
})

