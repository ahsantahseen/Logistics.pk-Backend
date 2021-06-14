const express = require("express");
const router = express.Router();
const ServiceCenter_Controller = require("../controllers/ServiceCenter");

const { service_center_post_record } = require("../controllers/ServiceCenter");
const { service_center_alter_record } = require("../controllers/ServiceCenter");

const {
  service_center_delete_record,
} = require("../controllers/ServiceCenter");

const checkAuth = require("../auth/checkAuth");

router.get("/", checkAuth, ServiceCenter_Controller.service_center_get_all);
router.get(
  "/id/:id",
  checkAuth,
  ServiceCenter_Controller.service_center_get_by_id
);
router.get(
  "/location/:location",
  checkAuth,
  ServiceCenter_Controller.service_center_get_by_location
);

router.post("/add", checkAuth, async (req, res) => {
  service_center_post_record(req, res);
  return res.send(req.body).status(201);
});

router.put("/update", checkAuth, async (req, res) => {
  service_center_alter_record(req, res);
  return res.send(req.body).status(202);
});

router.post("/delete", checkAuth, async (req, res) => {
  service_center_delete_record(req, res);
  return res.send(req.body).status(202);
});

module.exports = router;
