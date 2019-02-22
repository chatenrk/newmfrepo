const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require('cors');

const app = express();

const port = 3000;
const config = require("./config/database");

//Set up default mongoose connection
mongoose.connect(config.database, { useNewUrlParser: true });

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

// Log DB Connection success message
db.on("connected", () => {
  console.log("Connected to DB " + config.database);
});

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.send("Please pass the correct route");
});

app.listen(port);
console.log("Server running on port 3000");
