const oracledb = require("oracledb");
const bcrypt = require("bcrypt");

const refactorizor = (arr) => {
  const temp = [];
  let tempDect = {};
  for (let i = 0; i < arr.rows.length; i++) {
    for (let j = 0; j < arr.rows[0].length; j++) {
      tempDect[arr.metaData[j].name] = arr.rows[i][j];
    }
    temp.push({ ...tempDect });
  }

  return temp;
};

exports.signUp = (req, res) => {
  let email = req.body.email;
  let passowrd = req.body.password;
  oracledb
    .getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    })
    .then((connection) => {
      const hash = bcrypt.hashSync(passowrd, 10);
      connection
        .execute(
          "INSERT INTO USERS (EMAIL,PASSWORD) VALUES (:dataEMAIL,:dataPASSWORD)",
          [email, hash],
          { autoCommit: true }
        )
        .then((response) => {
          return res.send({ message: response }).status(201);
        })
        .catch((err) => {
          return res.send({ message: err.message }).status(409);
        });
    })
    .catch((err) => {
      return res.send({ err: err.message }).status(500);
    });
};
