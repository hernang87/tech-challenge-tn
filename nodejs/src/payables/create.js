const axios = require("axios");
const PayablesFactory = require("./payables-factory");

async function createPayables(transaction) {
  let payable;
  try {
    payable = PayablesFactory.create(transaction);
  } catch (error) {
    throw new Error(error);
  }

  const total = payable.getTotal();

  return await axios.post(process.env.PAYABLES, {
    create_date: payable.createDate,
    discount: (Number(transaction.value) - total).toFixed(2),
    status: payable.status,
    subtotal: transaction.value,
    total: total.toFixed(2),
  });
}

module.exports = createPayables;
