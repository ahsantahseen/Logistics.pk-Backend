const express = require("express");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const Staff_Controller = require("../controllers/Staff");
const { staff_post_record } = require("../controllers/Staff");

const { staff_alter_record } = require("../controllers/Staff");

const { staff_delete_record } = require("../controllers/Staff");

const checkAuth = require("../auth/checkAuth");

router.get("/", checkAuth, Staff_Controller.staff_get_all);

router.get("/id/:id", checkAuth, Staff_Controller.staff_get_by_id);

router.get("/name/:name", checkAuth, Staff_Controller.staff_get_by_name);

router.get("/age/:age", checkAuth, Staff_Controller.staff_get_by_age);

router.get(
  "/email/:email",
  checkAuth,
  Staff_Controller.staff_get_by_emailAddress
);

router.post("/add", checkAuth, async (req, res) => {
  staff_post_record(req, res);
  return res.send(req.body).status(201);
});

router.put("/update", checkAuth, async (req, res) => {
  staff_alter_record(req, res);
  console.log(+req.body.id);
  return res.send(req.body).status(201);
});

router.post("/delete", checkAuth, async (req, res) => {
  staff_delete_record(req, res);
  return res.send(req.body).status(202);
});

module.exports = router;
