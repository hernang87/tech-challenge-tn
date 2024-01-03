const CreditCardPayable = require("./credit-card");
const DebitCardPayable = require("./debit-card");

class PayablesFactory {
  static create(transaction) {
    /* eslint-disable indent */
    switch (transaction.method) {
      case "debit_card":
        return new DebitCardPayable(transaction);
      case "credit_card":
        return new CreditCardPayable(transaction);
      default:
        throw new Error("Invalid payable type");
    }
    /* eslint-enable indent */
  }
}

module.exports = PayablesFactory;
