const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();

const port = 3000;


app.use(cors());

app.use(express.static(path.join(__dirname,'../client')));
app.use('/', (req,res)=>{
    res.send("Please pass the correct route");
})

app.listen(port);
console.log("Server running on port 3000");