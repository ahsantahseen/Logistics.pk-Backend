const oracledb = require("oracledb");
const express = require("express");
const bodyParser = require("body-parser");

const morgan = require("morgan");
const cors = require("cors");
const app = express();

const serviceCenterRoute = require("./routes/ServiceCenter");
const packagesRoute = require("./routes/Package");
const staffRoute = require("./routes/Staff");
const transportationRoute = require("./routes/Transport");
const customerRoute = require("./routes/Customer");
const usersRoute = require("./routes/User");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //change to your own site if you have one and allow to use it only
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    // req.method Check what method is used for http req (e.g GET POST etc...)
    req.headers("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET"); //All the methods you want to support
    res.status(100).json({});
  }
  next();
});
app.use(morgan("combined"));

app.use("/serviceCenter", serviceCenterRoute);
app.use("/packages", packagesRoute);
app.use("/staff", staffRoute);
app.use("/transportation", transportationRoute);
app.use("/customer", customerRoute);
app.use("/user", usersRoute);

app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.stack = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
