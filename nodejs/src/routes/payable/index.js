const express = require("express");
const router = express.Router();
const getPayables = require("./get-payables");

router.get("/", getPayables);

module.exports = router;
