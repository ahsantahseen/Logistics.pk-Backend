const express = require("express");
const router = express.Router();

const TRANSPORATION_CONTROLLER = require("../controllers/Transport");

const { transportation_post_record } = require("../controllers/Transport");
const { transportation_alter_record } = require("../controllers/Transport");
const { transportation_delete_record } = require("../controllers/Transport");
const checkAuth = require("../auth/checkAuth");

router.get("/", checkAuth, TRANSPORATION_CONTROLLER.transportation_get_all);

router.get(
  "/id/:id",
  checkAuth,
  TRANSPORATION_CONTROLLER.transportation_get_by_id
);

router.post("/add", checkAuth, async (req, res) => {
  transportation_post_record(req, res);
  return res.send(req.body).status(201);
});

router.put("/update", checkAuth, async (req, res) => {
  transportation_alter_record(req, res);
  return res.send(req.body).status(202);
});

router.post("/delete", checkAuth, async (req, res) => {
  transportation_delete_record(req, res);
  return res.send(req.body).status(202);
});

module.exports = router;
