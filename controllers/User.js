const oracledb = require("oracledb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let email = req.body.email;
    let passowrd = req.body.password;
    const result = await connection.execute(
      `SELECT * FROM USERS WHERE EMAIL=:dataEMAIL`,
      [email]
    );
    if (result.rows[0]) {
      return res
        .send({
          message: "user exists",
        })
        .status(200);
    } else {
      const hash = bcrypt.hashSync(passowrd, 10);
      const result2 = await connection.execute(
        `INSERT INTO USERS (EMAIL,PASSWORD) VALUES (:dataEMAIL,:dataPASSWORD)`,
        [req.body.email, hash],
        { autoCommit: true }
      );
      return res
        .send({
          data: req.body,
          message: "user created",
        })
        .status(200);
    }
  } catch (error) {
    return res.send({ error: error }).status(500);
  }
};
exports.signIn = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let email = req.body.email;
    let password = req.body.password;
    const result = await connection.execute(
      `SELECT * FROM USERS WHERE EMAIL=:dataEMAIL`,
      [email]
    );
    if (result.rows[0]) {
      let hashedPassword = result.rows[0][1];
      const hashRes = bcrypt.compareSync(password, hashedPassword);
      if (hashRes) {
        const token = jwt.sign(
          {
            email: email,
          },
          "secretkey",
          {
            expiresIn: "1h",
          }
        );
        return res
          .send({
            message: "password exists",
            token: token,
          })
          .status(200);
      } else {
        return res
          .send({
            message: "password not exists",
          })
          .status(409);
      }
    } else {
      return res
        .json({
          message: "Wrong Credentials! Please check your credentials",
        })
        .status(400);
    }
    // Get current User
  } catch (error) {
    return res.send({ error: error }).status(500);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    const result = await connection.execute(
      `SELECT * FROM USERS WHERE EMAIL=:EMAIL`,
      [email]
    );
    if (result.rows[0]) {
      let hashedPassword = result.rows[0][1];
      const hashRes = bcrypt.compareSync(password, hashedPassword);
      if (hashRes) {
        console.log(hashRes);
        await connection.execute(
          `DELETE FROM USERS WHERE EMAIL=:Email`,
          [email],
          { autoCommit: true }
        );
        return res
          .send({
            message: "USER DELETED",
          })
          .status(200);
      } else {
        return res
          .send({
            message: "USER NOT DELETED",
          })
          .status(409);
      }
    } else {
      return res
        .json({
          message: "Wrong Credentials! Please check your credentials",
        })
        .status(400);
    }
  } catch (error) {
    console.log(error.message);
    return res.send({ error: error }).status(500);
  }
};
