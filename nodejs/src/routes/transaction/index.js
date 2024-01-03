const express = require("express");
const router = express.Router();
const processTransaction = require("./process");

router.post("/", processTransaction);

module.exports = router;
