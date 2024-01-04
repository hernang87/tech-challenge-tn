const moment = require("moment");

class CreditCardPayable {
  constructor(transaction) {
    this.transaction = transaction;
    this.status = "waiting_funds";
    this.createDate = moment().add(30, "days").format("DD/MM/YYYY");
    this.fee = 0.04;
  }

  getTotal() {
    return Number(this.transaction.value) * (1 - this.fee);
  }
}

module.exports = CreditCardPayable;
