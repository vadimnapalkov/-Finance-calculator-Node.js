var createError = require("http-errors");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const register = require("./routes/register");
const settings = require("./routes/settings");
const login = require("./routes/login");
const db = require("./db");
const cors = require("cors");

db().then(() => {
  server.listen(3001);
});

app.use(cors());
app.options("*", cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/api/register", register.submit);
app.post("/api/login", login.submit);
app.post("/api/categories/pay", settings.pay);
app.post("/api/categories/inc", settings.inc);
app.post("/api/categories/add/pay", settings.addpay);
app.post("/api/categories/add/inc", settings.addinc);
app.post("/api/categories/delete/pay", settings.deletepay);
app.post("/api/categories/delete/inc", settings.deleteinc);
app.post("/api/categories/rename/pay", settings.renamepay);
app.post("/api/categories/rename/inc", settings.renameinc);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
