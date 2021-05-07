const oracledb = require("oracledb");
const express = require("express");
const bodyParser = require("body-parser");

const morgan = require("morgan");
const cors = require("cors");
const app = express();
const serviceCenterRoute = require("./routes/ServiceCenter");
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

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
// const mypw = "123"; // set mypw to the hr schema password

// const getProducts = async (req, res) => {
//   try {
//     connection = await oracledb.getConnection({
//       user: "PRODUCTS_USER",
//       password: mypw,
//       connectString: "0.0.0.0/XEPDB1",
//     });

//     result = await connection.execute(`SELECT * FROM PRODUCTS`);
//     return res
//       .json({
//         name: result.metaData,
//         rows: result.rows,
//       })
//       .status(200);
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     if (connection) {
//       try {
//         await connection.close(); // Always close connections
//       } catch (err) {
//         console.error(err.message);
//       }
//     }
//   }
// };
// const getProductsByName = async (req, res, id) => {
//   try {
//     connection = await oracledb.getConnection({
//       user: "PRODUCTS_USER",
//       password: mypw,
//       connectString: "0.0.0.0/XEPDB1",
//     });
//     result = await connection.execute(
//       `SELECT * FROM PRODUCTS WHERE NAME=:id`,
//       id
//     );
//     console.log(id);
//     return res
//       .json({
//         res: result,
//       })
//       .status(200);
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     if (connection) {
//       try {
//         await connection.close(); // Always close connections
//       } catch (err) {
//         console.error(err.message);
//       }
//     }
//   }
// };
// const postProduct = async (req, res, data) => {
//   try {
//     connection = await oracledb.getConnection({
//       user: "PRODUCTS_USER",
//       password: mypw,
//       connectString: "0.0.0.0/XEPDB1",
//     });
//     console.log(data.name, parseInt(data.price));
//     result = await connection.execute(
//       `INSERT INTO PRODUCTS (NAME,PRICE) VALUES (:dataName,:convPrice)`,
//       [data.name, parseInt(data.price)],
//       { autoCommit: true }
//     );
//     return res
//       .json({
//         result,
//       })
//       .status(200);
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     if (connection) {
//       try {
//         await connection.close(); // Always close connections
//       } catch (err) {
//         console.error(err.message);
//       }
//     }
//   }
// };
// app.get("/products", (req, res) => {
//   getProducts(req, res);
// });

// app.get("/product/:id", (req, res) => {
//   let id = req.params;
//   console.log(id);
//   if (id === null) {
//     return res
//       .json({
//         message: "Error",
//       })
//       .status(400);
//   }
//   getProductsByName(req, res, id);
// });
// app.post("/addproduct/:name&:price", (req, res) => {
//   let data = req.params;
//   console.log(data);
//   if (data === null) {
//     return res
//       .json({
//         message: "Error",
//       })
//       .status(400);
//   }
//   postProduct(req, res, data);
// });
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
