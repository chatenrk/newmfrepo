const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const config = require('./config/database');

const earnRoute = require('./routes/earningsroutes');

// Connect to MongoDB using mongoose to retrieve data
mongoose.connect(config.database);
mongoose.connection.on('connected', function() {
  console.log('Connected to DB ' + config.database);
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to DB ' + config.database);
});

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb', parameterLimit: 1000000 }));

// BodyParser does not handle file uploads prpoperly. So need to check content type
var isMultipart = /^multipart\//i;
var urlencodedMiddleware = bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 1000000,
  extended: true
});

app.use(function(req, res, next) {
  var type = req.get('Content-Type');
  if (isMultipart.test(type)) return next();
  return urlencodedMiddleware(req, res, next);
});

app.use(express.static(path.join(__dirname, '../client')));
app.use('/earnings', earnRoute);

app.get('/', function(req, res) {
  res.send('Please pass the correct route');
});

app.listen(port);
console.log('listening on port 3000');
