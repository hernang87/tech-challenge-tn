const axios = require("axios");
const processTransaction = require("./process-transaction");
const createPayables = require("../../payables/create");

jest.mock("axios");
jest.mock("../../payables/create");

const anyResponse = {};

describe("processTransaction", () => {
  let req;
  let res;
  let transaction;
  let lastFourDigits = "0126";

  beforeEach(() => {
    req = {
      body: {
        cardCvv: "290",
        cardExpirationDate: "04/28",
        cardHolderName: "Fonsi Julian",
        cardNumber: "374245455400126",
        description: "T-Shirt Black/M",
        method: "debit_card",
        value: "340.30",
      },
    };

    res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    transaction = req.body;
  });

  it("should process a transaction", async () => {
    // Mock the axios post request
    axios.post.mockResolvedValueOnce({
      data: {
        ...transaction,
        id: "any_id",
        cardNumber: lastFourDigits,
      },
    });

    createPayables.mockResolvedValueOnce(anyResponse);

    await processTransaction(req, res);

    expect(axios.post).toHaveBeenCalledWith(process.env.TRANSACTIONS, {
      ...transaction,
      cardNumber: req.body.cardNumber.slice(-4),
      value: Number(req.body.value).toFixed(2),
    });

    expect(createPayables).toHaveBeenCalledWith(req.body);

    expect(res.send).toHaveBeenCalledWith({
      ...req.body,
      id: "any_id",
      cardNumber: req.body.cardNumber.slice(-4),
      value: Number(req.body.value).toFixed(2),
    });
  });
});
