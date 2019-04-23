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
const charts = require("./routes/charts");

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
app.post("/api/categories/add/payments", settings.addPayments);
app.post("/api/categories/add/incoming", settings.addIncoming);
app.delete("/api/categories/delete/payments/:id", settings.deletePayments);
app.delete("/api/categories/delete/incoming/:id", settings.deleteIncoming);
app.put("/api/categories/rename/payments", settings.renamePayments);
app.put("/api/categories/rename/incoming", settings.renameIncoming);
app.get("/api/payments/:userid", payments.values);
app.post("/api/payments/add", payments.addValue);
app.get("/api/income/:userid", income.values);
app.post("/api/income/add", income.addValue);
app.get("/api/charts", charts.dataForCharts);
app.get("/api/charts/date/:userid", charts.getDates);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
