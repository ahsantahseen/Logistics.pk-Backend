const express = require("express");
const router = express.Router();

const TRANSPORATION_CONTROLLER = require("../controllers/Transport");

const { transportation_post_record } = require("../controllers/Transport");
const { transportation_alter_record } = require("../controllers/Transport");
const { transportation_delete_record } = require("../controllers/Transport");

router.get("/", TRANSPORATION_CONTROLLER.transportation_get_all);

router.get("/id/:id", TRANSPORATION_CONTROLLER.transportation_get_by_id);

router.post("/add", (req, res) => {
  transportation_post_record(req, res);
});

router.put("/update", (req, res) => {
  transportation_alter_record(req, res);
});

router.post("/delete", (req, res) => {
  transportation_delete_record(req, res);
});

module.exports = router;
