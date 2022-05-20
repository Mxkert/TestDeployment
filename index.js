// Create Express
const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// MongoDB Database using Mongoose
const mongoose = require('mongoose');

const app = express();

// App use
app.use(volleyball);
app.use(cors());
app.use(express.json());

console.log('Testing purposes');

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  console.log(__dirname);
  app.use(express.static('client/build'));
  app.get("/serviceWorker.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "src", "serviceWorker.js"));
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = 5000;
app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});