const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secretkey");
    next();
    req.userData = decoded;
  } catch (error) {
    return res
      .send({
        message: "Auth Failed!",
      })
      .status(401);
  }
};
