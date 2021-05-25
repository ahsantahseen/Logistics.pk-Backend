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
exports.service_center_get_all = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    const result = await connection.execute(`SELECT * FROM SERVICE_CENTER`);
    console.log(result);

    return res
      .json({
        data: refactorizor(result),
      })
      .status(200);
  } catch (err) {
    res
      .json({
        error: err,
      })
      .status(404);
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
exports.service_center_get_by_id = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let id = req.params;
    let result = await connection.execute(
      `SELECT * FROM SERVICE_CENTER WHERE ID=:id`,
      id
    );

    if (result.rows) {
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
        .status(404);
    }
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
exports.service_center_get_by_location = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let location = req.params;
    console.log(location);
    result = await connection.execute(
      `SELECT * FROM SERVICE_CENTER WHERE LOCATION=:location`,
      location
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
exports.service_center_post_record = async (req, res) => {
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
      `INSERT INTO SERVICE_CENTER (ID,LOCATION,STAFF_AMOUNT,ALLOCATED_TRANSPORT,MANAGER_ID,RATING) 
      VALUES (:dataID,:dataLocation,:dataRating,:dataSA,:dataAT,:dataMID:dataRating)`,
      [
        Math.floor(1000 + Math.random() * 9000),
        data.location,
        data.staffamount,
        data.allocatedtransport,
        data.managerid,
        data.rating,
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
exports.service_center_alter_record = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let data = req.body;
    console.log(data);
    if (data === null) {
      return res
        .json({
          message: "DATA IS NULL",
        })
        .status(400);
    }

    result = await connection.execute(
      `UPDATE SERVICE_CENTER SET LOCATION=:dataLocation,
      STAFF_AMOUNT=:dataSA,
      ALLOCATED_TRANSPORT=:dataAT,
      MANAGER_ID=:dataMID,RATING=:dataRating WHERE ID=:dataID`,
      [
        data.location,
        parseInt(data.staffamount),
        parseInt(data.allocatedtransport),
        parseInt(data.managerid),
        parseFloat(data.rating),
        parseInt(data.id),
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
exports.service_center_delete_record = async (req, res) => {
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
      `DELETE FROM SERVICE_CENTER WHERE ID=:dataID`,
      [data.id],
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
