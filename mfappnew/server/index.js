var express = require("express");
var app = express();

var port = 3000;

app.get("/", (req, res) => {
    res.send("Please pass the correct route");
});

app.listen(port);
console.log("Server running on port 3000");
