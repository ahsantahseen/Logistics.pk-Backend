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

exports.staff_get_all = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    result = await connection.execute(`SELECT * FROM STAFF`);
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
exports.staff_get_by_id = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let ID = req.params;
    console.log(location);
    result = await connection.execute(`SELECT * FROM STAFF WHERE ID=:ID`, ID);
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

exports.staff_get_by_name = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let NAME = req.params;
    console.log(location);
    result = await connection.execute(
      `SELECT * FROM STAFF WHERE NAME=:NAME`,
      NAME
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

exports.staff_get_by_age = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let NAME = req.params;
    console.log(location);
    result = await connection.execute(
      `SELECT * FROM STAFF WHERE AGE=:AGE`,
      NAME
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

exports.staff_get_by_emailAddress = async (req, res) => {
  try {
    connection = await oracledb.getConnection({
      user: "C##_LOGI",
      password: "123",
      connectString: "0.0.0.0/XE",
    });
    let NAME = req.params;
    console.log(location);
    result = await connection.execute(
      `SELECT * FROM STAFF WHERE EMAIL_ADDRESS=:EMAIL_ADDRESS`,
      EMAIL_ADDRESS
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

exports.staff_post_record = async (req, res) => {
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
      `INSERT INTO STAFF (ID,NAME,ADDRESS,AGE,CONTACT_NUMBER,CNIC_NUMBER,SERVICE_CENTER_ID,ROLE,EMAIL_ADDRESS) 
      VALUES (:dataID,:dataname,:dataAddress,:dataAge,:dataContactNumber,:dataCnicNumber,:dataSCID,:dataRole,:dataEmail)`,
      [
        Math.floor(100 + Math.random() * 9000),
        data.name,
        data.address,
        data.age,
        data.contactNumber,
        data.cnicNumber,
        data.scID,
        data.role,
        data.emailAddress,
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
exports.staff_alter_record = async (req, res) => {
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
    console.log(parseInt(data.id));
    result = await connection.execute(
      `UPDATE STAFF SET NAME=:dataNAME,ADDRESS=:dataAddress,AGE=:dataAGE,CONTACT_NUMBER=:dataContactNumber,CNIC_NUMBER=:dataCNICnumber
      ,SERVICE_CENTER_ID=:dataSCID,ROLE=:dataRole,EMAIL_ADDRESS=:dataEmail
       WHERE ID=:dataID`,
      [
        data.name,
        data.address,
        parseInt(data.age),
        parseInt(data.contactNumber),
        parseInt(data.cnicNumber),
        parseInt(data.scID),
        data.role,
        data.emailAddress,
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

exports.staff_delete_record = async (req, res) => {
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
      `DELETE FROM STAFF WHERE ID=:dataID`,
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
