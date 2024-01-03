const axios = require("axios");

async function processTransaction(req, res) {
  const transaction = req.body;
  const value = Number(transaction.value).toFixed(2);
  const cardNumber = transaction.cardNumber.slice(-4);

  const result = await axios.post(process.env.TRANSACTIONS, {
    ...transaction,
    cardNumber,
    value,
  });

  res.send(result.data);
}

module.exports = processTransaction;
