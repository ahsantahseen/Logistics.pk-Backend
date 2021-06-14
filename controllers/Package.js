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
exports.packages_get_all = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    result = await connection.execute(`SELECT * FROM PACKAGES`);
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
exports.packages_get_by_id = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let id = req.params;
    result = await connection.execute(
      `SELECT * FROM PACKAGES WHERE ID=:id`,
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
exports.packages_get_by_status = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let status = req.params;
    console.log(location);
    result = await connection.execute(
      `SELECT * FROM PACKAGES WHERE STATUS=:status`,
      status
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
exports.packages_get_by_service_center_id = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let scID = req.params;
    console.log(location);
    result = await connection.execute(
      `SELECT * FROM PACKAGES WHERE SERVICE_CENTER_ID=:scID`,
      scID
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
exports.packages_post_record = async (req, res) => {
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
    let packageID = Math.floor(1000 + Math.random() * 9000);
    result = await connection.execute(
      `INSERT INTO PACKAGES (ID,WEIGHT,DIMENSIONS,FRAGILE,INSURANCE_AMOUNT,STATUS,DESTINATION,SERVICE_CENTER_ID,CUSTOMER_ID,CUSTOMER_PHONE) 
      VALUES (:dataID,:dataWeight,:dataDimensions,:dataFraglie,:dataIA,:dataStatus,:dataDestination,:datascID,:dataCustomerID,:dataCustomerPhone)`,
      [
        packageID,
        data.weight,
        data.dimensions,
        data.fragile,
        data.insuranceAmount,
        data.status,
        data.destination,
        data.scID,
        data.customer_id,
        data.customer_phone,
      ],
      { autoCommit: true }
    );
    client.messages
      .create({
        body: `Dear Customer, your package ${packageID} has been received by our Service Center ${data.scID} Package Weight:${data.weight} kg with the insurance amount of ${data.insuranceAmount} RS and will be shipped to ${data.destination} \n \n Thank you for using Logistics.pk`,
        from: "+13476585460",
        to: data.customer_phone,
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

exports.packages_alter_record = async (req, res) => {
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
      `UPDATE PACKAGES SET WEIGHT=:dataWeight,DIMENSIONS=:dataDimensions
      ,FRAGILE=:dataFraglie,INSURANCE_AMOUNT=:dataIA,STATUS=:dataStatus,DESTINATION=:dataDestination,SERVICE_CENTER_ID=:dataSCID,CUSTOMER_ID=:dataCustomerID,CUSTOMER_PHONE=:dataCustomerPhone
       WHERE ID=:dataID`,
      [
        parseFloat(data.weight),
        data.dimensions,
        data.fragile,
        parseFloat(data.insuranceAmount),
        data.status,
        data.destination,
        parseInt(data.scID),
        parseInt(data.customer_id),
        data.customer_phone,
        parseInt(data.id),
      ],
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
exports.packages_delete_record = async (req, res) => {
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
      `DELETE FROM PACKAGES WHERE ID=:dataID`,
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
