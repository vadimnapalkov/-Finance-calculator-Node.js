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
const payments = require("./routes/payments");
const income = require("./routes/income");

const port = process.env.PORT || 3001;
db().then(() => {
  server.listen(port);
});

app.use(cors());
app.options("*", cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/api/register", register.post);
app.post("/api/login", login.post);
app.get("/api/categories/payments/:userid", settings.payments);
app.get("/api/categories/incoming/:userid", settings.incoming);
app.post("/api/categories/add/payments", settings.addpayments);
app.post("/api/categories/add/incoming", settings.addincoming);
app.delete("/api/categories/delete/payments/:id", settings.deletepayments);
app.delete("/api/categories/delete/incoming/:id", settings.deleteincoming);
app.put("/api/categories/rename/payments", settings.renamepayments);
app.put("/api/categories/rename/incoming", settings.renameincoming);
app.get("/api/payments/:userid", payments.values);
app.post("/api/payments/add", payments.addvalue);
app.get("/api/income/:userid", income.values);
app.post("/api/income/add", income.addvalue);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
