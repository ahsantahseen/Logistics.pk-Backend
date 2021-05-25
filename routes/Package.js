const express = require("express");
const router = express.Router();

const Packages_Controller = require("../controllers/Package");

const { packages_post_record } = require("../controllers/Package");
const { packages_alter_record } = require("../controllers/Package");
const { packages_delete_record } = require("../controllers/Package");

router.get("/", Packages_Controller.packages_get_all);
router.get("/id/:id", Packages_Controller.packages_get_by_id);
router.get(
  "/serviceCenterID/:scID",
  Packages_Controller.packages_get_by_service_center_id
);
router.get("/status/:status", Packages_Controller.packages_get_by_status);

router.post("/add", (req, res) => {
  packages_post_record(req, res);
});

router.put("/update", async (req, res) => {
  packages_alter_record(req, res);
});

router.post("/delete", async (req, res) => {
  packages_delete_record(req, res);
});

module.exports = router;
