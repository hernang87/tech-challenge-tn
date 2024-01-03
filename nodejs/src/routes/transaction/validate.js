const transactionSchema = require("./schema");

function validateTransaction(req, res, next) {
  const { error } = transactionSchema.validate(req.body);

  if (error) {
    res.status(400).send({
      errors: error.details.map((detail) => ({
        message: detail.message,
        path: detail.path,
      })),
    });
    return;
  }

  next();
}

module.exports = validateTransaction;
