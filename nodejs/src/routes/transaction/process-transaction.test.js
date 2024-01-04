const axios = require("axios");
const processTransaction = require("./process-transaction");
const createPayables = require("../../payables/create");

jest.mock("axios");
jest.mock("../../payables/create");

const any = {};

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
        cardNumber: `37424545540${lastFourDigits}`,
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
    const expectedValue = Number(transaction.value).toFixed(2);

    axios.post.mockResolvedValueOnce({
      data: {
        ...transaction,
        id: "any_id",
        cardNumber: lastFourDigits,
      },
    });

    createPayables.mockResolvedValueOnce(any);

    await processTransaction(req, res);

    expect(axios.post).toHaveBeenCalledWith(process.env.TRANSACTIONS, {
      ...transaction,
      cardNumber: lastFourDigits,
      value: expectedValue,
    });

    expect(res.send).toHaveBeenCalledWith({
      ...transaction,
      id: "any_id",
      cardNumber: lastFourDigits,
      value: expectedValue,
    });
  });

  it("tries to create payables", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        ...transaction,
        id: "any_id",
        cardNumber: lastFourDigits,
      },
    });

    createPayables.mockResolvedValueOnce(any);

    await processTransaction(req, res);

    expect(createPayables).toHaveBeenCalledWith(transaction);
  });

  it("should return an error if the payables creation fails", async () => {
    const error = new Error("any_error");
    createPayables.mockRejectedValueOnce(error);

    await processTransaction(req, res).then();

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: error.message });
  });
});
