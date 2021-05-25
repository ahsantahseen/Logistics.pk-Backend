const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/User");

router.post("/signup", async (req, res) => {
  signUp(req, res);
});
router.post("/login");

module.exports = router;
