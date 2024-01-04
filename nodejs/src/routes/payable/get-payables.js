const axios = require("axios");
const moment = require("moment");

async function getPayables(req, res) {
  let response;
  try {
    response = await axios.get(process.env.PAYABLES);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
    return;
  }

  if (!response) {
    res.status(500).send({ error: "No payables found" });
    return;
  }

  const now = moment();

  const totals = response.data.reduce(
    (acc, payable) => {
      const [day, month, year] = payable.create_date.split("/");
      const payableDate = moment().set({ day, month, year });
      if (payableDate.isBefore(now) && payable.status === "paid") {
        acc.paidTotal += Number(payable.total);
      } else {
        acc.waitingFundsTotal += Number(payable.total);
      }

      acc.feesTotal += Number(payable.discount);

      return acc;
    },
    { feesTotal: 0, paidTotal: 0, waitingFundsTotal: 0 }
  );

  res.status(200).send({
    feesTotal: totals.feesTotal.toFixed(2),
    paidTotal: totals.paidTotal.toFixed(2),
    waitingFundsTotal: totals.waitingFundsTotal.toFixed(2),
  });
}

module.exports = getPayables;
