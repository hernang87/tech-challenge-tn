const moment = require("moment");

class DebitCardPayable {
  constructor(transaction) {
    this.transaction = transaction;
    this.status = "paid";
    this.createDate = moment().format("DD/MM/YYYY");
    this.fee = 0.02;
  }

  getTotal() {
    return Number(this.transaction.value) * (1 - this.fee);
  }
}

module.exports = DebitCardPayable;
