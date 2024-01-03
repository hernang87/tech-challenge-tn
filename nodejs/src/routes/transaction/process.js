const transactionSchema = require("./schema");

function validateTransaction(transaction) {
  const result = transactionSchema.validate(transaction);
  return result.error;
}

function processTransaction(req, res) {
  const transaction = req.body;

  const error = validateTransaction(transaction);

  if (error) {
    console.log(error);
    res.status(400).send({
      errors: error.details.map((detail) => ({
        message: detail.message,
        path: detail.path,
      })),
    });
    return;
  }

  res.send(200);
}

module.exports = processTransaction;
