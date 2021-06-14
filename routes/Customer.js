const express = require("express");
const router = express.Router();

const Customers_Controller = require("../controllers/Customer");

const { customers_post_record } = require("../controllers/Customer");
const { customers_alter_record } = require("../controllers/Customer");
const { customers_delete_record } = require("../controllers/Customer");

const checkAuth = require("../auth/checkAuth");

router.get("/", checkAuth, Customers_Controller.customers_get_all);
router.get("/id/:id", checkAuth, Customers_Controller.customers_get_by_id);

router.post("/add", async (req, res) => {
  customers_post_record(req, res);
  return res.send(req.body).status(201);
});

router.put("/update", checkAuth, async (req, res) => {
  customers_alter_record(req, res);
  return res.send(req.body).status(202);
});

router.post("/delete", checkAuth, async (req, res) => {
  customers_delete_record(req, res);
  return res.send(req.body).status(202);
});

module.exports = router;
