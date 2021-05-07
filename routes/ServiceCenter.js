const express = require("express");
const router = express.Router();
const ServiceCenter_Controller = require("../controllers/ServiceCenter");

const { service_center_post_record } = require("../controllers/ServiceCenter");

router.get("/", ServiceCenter_Controller.service_center_get_all);
router.get("/id/:id", ServiceCenter_Controller.service_center_get_by_id);
router.get(
  "/loc/:location",
  ServiceCenter_Controller.service_center_get_by_location
);

router.post("/addsc", async (req, res) => {
  service_center_post_record(req, res);
  return res.send(req.body).status(201);
});

module.exports = router;
