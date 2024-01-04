const PayablesFactory = require("./payables-factory");
const DebitCardPayable = require("./debit-card");
const CreditCardPayable = require("./credit-card");

describe("PayablesFactory", () => {
  let transaction;

  beforeEach(() => {
    transaction = {
      cardCvv: "290",
      cardExpirationDate: "04/28",
      cardHolderName: "Fonsi Julian",
      cardNumber: "374245455400126",
      description: "T-Shirt Black/M",
      method: "debit_card",
      value: "340",
    };
  });

  it("should return a new instance of DebitCardPayable", () => {
    const payable = PayablesFactory.create(transaction);
    expect(payable).toBeInstanceOf(DebitCardPayable);
  });

  it("calculates the total value of a debit card purchase with the correct fee", () => {
    const payable = PayablesFactory.create(transaction);
    expect(payable.getTotal()).toEqual(333.2);
  });

  it("should return a new instance of CreditCardPayable", () => {
    transaction.method = "credit_card";
    const payable = PayablesFactory.create(transaction);
    expect(payable).toBeInstanceOf(CreditCardPayable);
  });

  it("calculates the total value of a credit card purchase with the correct fee", () => {
    transaction.method = "credit_card";
    const payable = PayablesFactory.create(transaction);
    expect(payable.getTotal()).toEqual(326.4);
  });

  it("should throw an error if the method is not implemented", () => {
    transaction.method = "something";
    expect(() => PayablesFactory.create(transaction)).toThrow(
      "Invalid payable type"
    );
  });
});
