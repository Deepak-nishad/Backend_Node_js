const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/cars", (req, res) => {
  const { name, brand } = req.body;

  console.log(name);
  console.log(brand);
  res.send("car submitted succesfully");
});

const uri = "";
mongoose.connect(uri).then(() => {
  console.log("Connection successfully established");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});
