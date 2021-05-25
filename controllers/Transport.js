const oracledb = require("oracledb");
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
exports.transportation_get_all = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    result = await connection.execute(`SELECT * FROM TRANSPORTATION`);
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

exports.transportation_get_by_id = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let ID = req.params;
    console.log(location);
    result = await connection.execute(
      `SELECT * FROM TRANSPORTATION WHERE ID=:dataID`,
      ID
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
exports.transportation_post_record = async (req, res) => {
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
      `INSERT INTO TRANSPORTATION 
      (ID,VEHICAL_NAME,VEHICAL_TYPE,REGISTRATION_NUMBER,MANUFACTURER,SERVICE_CENTER_ID) 
        VALUES 
        (:dataID,:dataVEHICAL_NAME,:dataVEHICAL_TYPE,
            :dataREGISTARTION_NUMBER,:dataMANUFACTURER,:dataSERVICE_CENTER_ID)`,
      [
        Math.floor(1000 + Math.random() * 9000),
        data.vehicalName,
        data.vehicalType,
        data.registrationNumber,
        data.manufacturer,
        data.scID,
      ],
      { autoCommit: true }
    );
  } catch (err) {
    return res
      .json({
        error: err,
      })
      .status(400);
  } finally {
    if (connection) {
      try {
        await connection.close();
        return res
          .json({
            message: req.body,
          })
          .status(400);
      } catch (err) {
        return res
          .json({
            error: err,
          })
          .status(400);
      }
    }
  }
};

exports.transportation_alter_record = async (req, res) => {
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
      `UPDATE TRANSPORTATION SET VEHICAL_NAME=:dataVEHICAL_NAME,
        VEHICAL_TYPE=:dataVEHICAL_TYPE,
        REGISTRATION_NUMBER=:dataREGISTARTION_NUMBER
        ,MANUFACTURER=:dataMANUFACTURER
        ,SERVICE_CENTER_ID=:dataSERVICE_CENTER_ID 
          WHERE ID=:dataID`,
      [
        data.vehicalName,
        data.vehicalType,
        data.registrationNumber,
        data.manufacturer,
        parseInt(data.scID),
        parseInt(data.ID),
      ],
      { autoCommit: true }
    );
  } catch (err) {
    return res
      .json({
        error: err,
      })
      .status(400);
  } finally {
    if (connection) {
      try {
        await connection.close();
        return res
          .json({
            message: req.body,
          })
          .status(400);
      } catch (err) {
        return res
          .json({
            error: err,
          })
          .status(400);
      }
    }
  }
};
exports.transportation_delete_record = async (req, res) => {
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
      `DELETE FROM TRANSPORTATION WHERE ID=:dataID`,
      [data.ID],
      { autoCommit: true }
    );
  } catch (err) {
    return res
      .json({
        error: err,
      })
      .status(400);
  } finally {
    if (connection) {
      try {
        await connection.close();
        return res
          .json({
            message: req.body,
          })
          .status(400);
      } catch (err) {
        return res
          .json({
            error: err,
          })
          .status(400);
      }
    }
  }
};
