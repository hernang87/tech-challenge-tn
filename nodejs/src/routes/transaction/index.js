const express = require("express");
const router = express.Router();
const process = require("./process-transaction");
const validate = require("./validate-transaction");

router.post("/", validate, process);

module.exports = router;
