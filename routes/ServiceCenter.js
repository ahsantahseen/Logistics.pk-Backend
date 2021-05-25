const express = require("express");
const router = express.Router();
const ServiceCenter_Controller = require("../controllers/ServiceCenter");

const { service_center_post_record } = require("../controllers/ServiceCenter");
const { service_center_alter_record } = require("../controllers/ServiceCenter");

const {
  service_center_delete_record,
} = require("../controllers/ServiceCenter");

router.get("/", ServiceCenter_Controller.service_center_get_all);
router.get("/id/:id", ServiceCenter_Controller.service_center_get_by_id);
router.get(
  "/location/:location",
  ServiceCenter_Controller.service_center_get_by_location
);

router.post("/add", (req, res) => {
  service_center_post_record(req, res);
});

router.put("/update", (req, res) => {
  service_center_alter_record(req, res);
});

router.post("/delete", (req, res) => {
  service_center_delete_record(req, res);
});

module.exports = router;
