const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');

app.use(volleyball);

app.use(express.static(path.resolve(__dirname, '..', 'client')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port 3000");
});