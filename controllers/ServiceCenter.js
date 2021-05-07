const oracledb = require("oracledb");

exports.service_center_get_all = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    result = await connection.execute(`SELECT * FROM SERVICE_CENTER`);
    return res
      .json({
        name: result.metaData,
        rows: result.rows,
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

exports.service_center_get_by_id = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let id = req.params;
    result = await connection.execute(
      `SELECT * FROM SERVICE_CENTER WHERE ID=:id`,
      id
    );
    if (result.rows[0]) {
      return res
        .json({
          name: result.metaData,
          rows: result.rows,
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
          name: result.metaData,
          rows: result.rows,
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
exports.service_center_post_record = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let data = req.body;
    console.log("121221");
    if (data === null) {
      return res
        .json({
          message: "DATA IS NULL",
        })
        .status(400);
    }
    result = await connection.execute(
      `INSERT INTO SERVICE_CENTER (LOCATION,STAFF_AMOUNT,ALLOCATED_TRANSPORT,MANAGER_ID,RATING) VALUES (:dataLocation,:dataRating,:dataSA,:dataAT,:dataMID:dataRating)`,
      [
        data.location,
        parseInt(data.staffamount),
        parseInt(data.allocatedtransport),
        parseInt(data.managerid),
        parseFloat(data.rating),
      ],
      { autoCommit: true }
    );
    if (result.rows[0]) {
      return res
        .json({
          message: "Successfully added rows",
        })
        .status(201);
    } else {
      return res
        .json({
          error: "CANNOT INSERT A RECORD!",
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
