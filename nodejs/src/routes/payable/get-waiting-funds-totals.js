const axios = require("axios");

async function getWaitingFundsTotals(_, res) {
  const payables = await axios.get(process.env.PAYABLES);

  const totals = payables.data
    .filter((p) => p.status === "waiting_funds")
    .reduce(
      (acc, p) => ({
        fees: acc.fees + Number(p.discount),
        subtotal: acc.subtotal + Number(p.subtotal),
        total: acc.total + Number(p.total),
      }),
      {
        fees: 0,
        subtotal: 0,
        total: 0,
      }
    );

  res.send({
    fees: Number(totals.fees).toFixed(2),
    subtotal: Number(totals.subtotal).toFixed(2),
    total: Number(totals.total).toFixed(2),
  });
}

module.exports = getWaitingFundsTotals;
