var createError = require("http-errors");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");

server.listen(3001);

app.use(cors());
app.options("*", cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
