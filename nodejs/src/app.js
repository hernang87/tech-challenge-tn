require("dotenv").config();
const express = require("express");
const logger = require("morgan");

const app = express();
const PORT = process.env.PORT;

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/transaction", require("./routes/transaction"));
app.use("/payable", require("./routes/payable"));

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});
