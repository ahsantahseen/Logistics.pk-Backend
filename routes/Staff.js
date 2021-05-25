const express = require("express");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const Staff_Controller = require("../controllers/Staff");
const { staff_post_record } = require("../controllers/Staff");

const { staff_alter_record } = require("../controllers/Staff");

const { staff_delete_record } = require("../controllers/Staff");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:|\./g, "") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  let files = fs.readdirSync("./uploads/");
  if (files.includes(file.originalname)) {
    fs.unlinkSync("./uploads/" + file.originalname);
  }
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("File Cannot Be Stored! Check requirements"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", Staff_Controller.staff_get_all);

router.get("/id/:id", Staff_Controller.staff_get_by_id);

router.get("/name/:name", Staff_Controller.staff_get_by_name);

router.get("/age/:age", Staff_Controller.staff_get_by_age);

router.get("/email/:email", Staff_Controller.staff_get_by_emailAddress);

router.post("/add", upload.single("staffImage"), (req, res) => {
  staff_post_record(req, res);
});

router.put("/update", upload.single("staffImage"), (req, res) => {
  staff_alter_record(req, res);
});

router.post("/delete", (req, res) => {
  staff_delete_record(req, res);
});

module.exports = router;
