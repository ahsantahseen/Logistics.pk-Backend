const express = require("express");
const router = express.Router();

const Packages_Controller = require("../controllers/Package");

const { packages_post_record } = require("../controllers/Package");
const { packages_alter_record } = require("../controllers/Package");
const { packages_delete_record } = require("../controllers/Package");

const checkAuth = require("../auth/checkAuth");

router.get("/", checkAuth, Packages_Controller.packages_get_all);
router.get("/id/:id", Packages_Controller.packages_get_by_id);
router.get(
  "/serviceCenterID/:scID",
  checkAuth,
  Packages_Controller.packages_get_by_service_center_id
);
router.get(
  "/status/:status",
  checkAuth,
  Packages_Controller.packages_get_by_status
);

router.post("/add", checkAuth, async (req, res) => {
  packages_post_record(req, res);
  return res.send(req.body).status(201);
});

router.put("/update", checkAuth, async (req, res) => {
  packages_alter_record(req, res);
  return res.send(req.body).status(202);
});

router.post("/delete", checkAuth, async (req, res) => {
  packages_delete_record(req, res);
  return res.send(req.body).status(202);
});

module.exports = router;
