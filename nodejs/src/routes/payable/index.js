const express = require("express");
const router = express.Router();
const getWaitingFundsTotals = require("./get-waiting-funds-totals");

router.get("/waiting-funds", getWaitingFundsTotals);

module.exports = router;
