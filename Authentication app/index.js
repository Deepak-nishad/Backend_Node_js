const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.Port || 5000;
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());
const user = require("./routes/user");
app.use("/api/v1", user);

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
})

const { connect } = require("./config/database");
connect();