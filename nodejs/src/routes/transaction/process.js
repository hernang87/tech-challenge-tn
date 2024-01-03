const axios = require("axios");
const createPayables = require("../../payables/create");

async function processTransaction(req, res) {
  const transaction = req.body;
  const value = Number(transaction.value).toFixed(2);
  const cardNumber = transaction.cardNumber.slice(-4);

  // If no payables are created we don't want to create the order
  try {
    await createPayables(transaction);
  } catch (error) {
    res.status(400).send({ error: error.message });
    return;
  }

  const result = await axios.post(process.env.TRANSACTIONS, {
    ...transaction,
    cardNumber,
    value,
  });

  res.send(result.data);
}

module.exports = processTransaction;
