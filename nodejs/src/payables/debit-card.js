const moment = require("moment");

class DebitCardPayable {
  constructor(transaction) {
    this.transaction = transaction;
    this.status = "waiting_funds";
    this.createDate = moment().format("DD/MM/YYYY");
    this.fee = 0.02;
  }

  getTotal() {
    return Number(this.transaction.value) * this.fee;
  }
}

module.exports = DebitCardPayable;
