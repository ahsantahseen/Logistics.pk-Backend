const oracledb = require("oracledb");
const accountSid = "ACc4a83117f0f13f7dc77125998dc2fc26";
const authToken = "729f97f20db463c1d2413bbdd5194216";
const client = require("twilio")(accountSid, authToken);

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
exports.customers_get_all = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    result = await connection.execute(`SELECT * FROM CUSTOMERS`);
    return res
      .json({
        data: refactorizor(result),
      })
      .status(200);
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};
exports.customers_get_by_id = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let id = req.params;
    result = await connection.execute(
      `SELECT * FROM CUSTOMERS WHERE ID=:id`,
      id
    );
    if (result.rows[0]) {
      return res
        .json({
          data: refactorizor(result),
        })
        .status(200);
    } else {
      return res
        .json({
          error: "NO ROWS FOUND!",
        })
        .status(400);
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};
exports.customers_post_record = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let data = req.body;
    if (data === null) {
      return res
        .json({
          message: "DATA IS NULL",
        })
        .status(400);
    }
    result = await connection.execute(
      `INSERT INTO CUSTOMERS (ID,NAME,PHONE_NUMBER,ADDRESS) 
        VALUES (:dataID,:dataName,:dataPnumber,:dataAddress)`,
      [
        Math.floor(100 + Math.random() * 9000),
        data.name,
        data.phone_number,
        data.address,
      ],
      { autoCommit: true }
    );
    client.messages
      .create({
        body: `Dear ${data.name} your order has been placed, you'll be soon in touch with our package collection team  \n \n Thank you for using Logistics.pk`,
        from: "+13476585460",
        to: data.phone_number,
      })
      .then((message) => console.log(message))
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};

exports.customers_alter_record = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let data = req.body;
    if (data === null) {
      return res
        .json({
          message: "DATA IS NULL",
        })
        .status(400);
    }
    result = await connection.execute(
      `UPDATE CUSTOMERS SET NAME=:dataName,PHONE_NUMBER=:dataPnumber,ADDRESS=:dataAddress 
          WHERE ID=:dataID`,
      [data.name, data.phone_number, data.address, parseInt(data.id)],
      { autoCommit: true }
    );
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};
exports.customers_delete_record = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let data = req.body;
    if (data === null) {
      return res
        .json({
          message: "DATA IS NULL",
        })
        .status(400);
    }
    result = await connection.execute(
      `DELETE FROM CUSTOMERS WHERE ID=:dataID`,
      [data.id],
      { autoCommit: true }
    );
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};
