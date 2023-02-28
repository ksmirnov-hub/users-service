const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const cors = require('cors');
const newApp = express();

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost/users-db");
const connection = mongoose.connection;
console.log('connection', connection);
connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});
newApp.use(cors());
newApp.use(bodyParse.json({limit:'50mb'}));
newApp.use(bodyParse.json());
newApp.use("/api", require("./api"));

newApp.listen(4000, () => {
	console.log("server is listening");
});
