const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/User");

const { signIn } = require("../controllers/User");

const { signOut } = require("../controllers/User");

const { deleteUser } = require("../controllers/User");

const checkAuth = require("../auth/checkAuth");

router.post("/signup", async (req, res) => {
  signUp(req, res);
});
router.post("/login", async (req, res) => {
  signIn(req, res);
});
router.post("/logout", async (req, res) => {
  signOut(req, res);
});

router.post("/delete", checkAuth, async (req, res) => {
  deleteUser(req, res);
});

module.exports = router;
