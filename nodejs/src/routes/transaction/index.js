const express = require("express");
const router = express.Router();
const process = require("./process");
const validate = require("./validate");

router.post("/", validate, process);

module.exports = router;
