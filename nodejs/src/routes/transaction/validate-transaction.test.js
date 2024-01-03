const validateTransaction = require("./validate-transaction");

describe("validateTransaction", () => {
  let req;
  let res;
  let next;

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

    next = jest.fn();
  });

  it("succeds if all fields are provided", () => {
    validateTransaction(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("fails if no cvv is provided", () => {
    delete req.body.cardCvv;

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: '"cardCvv" is required',
          path: ["cardCvv"],
        },
      ],
    });
  });

  it("fails if invalid format for card expiration date is provided", () => {
    req.body.cardExpirationDate = "something else";

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message:
            '"cardExpirationDate" with value "something else" fails to match the required pattern: /^\\d{2}\\/\\d{2}$/',
          path: ["cardExpirationDate"],
        },
      ],
    });
  });

  it("fails if past card expiration date is provided", () => {
    req.body.cardExpirationDate = "04/20";

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: "Expiration date is invalid",
          path: ["cardExpirationDate"],
        },
      ],
    });
  });

  it("fails if no card expiration date is provided", () => {
    delete req.body.cardExpirationDate;

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: '"cardExpirationDate" is required',
          path: ["cardExpirationDate"],
        },
      ],
    });
  });

  it("fails if no card holder name is provided", () => {
    delete req.body.cardHolderName;

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: '"cardHolderName" is required',
          path: ["cardHolderName"],
        },
      ],
    });
  });

  it("fails if empty card holder name is provided", () => {
    req.body.cardHolderName = "";

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: '"cardHolderName" is not allowed to be empty',
          path: ["cardHolderName"],
        },
      ],
    });
  });

  it("fails if no card number is provided", () => {
    delete req.body.cardNumber;

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: '"cardNumber" is required',
          path: ["cardNumber"],
        },
      ],
    });
  });

  it("fails if invalid format for card number is provided", () => {
    req.body.cardNumber = "ABCD";

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message:
            '"cardNumber" with value "ABCD" fails to match the required pattern: /^\\d+$/',
          path: ["cardNumber"],
        },
      ],
    });
  });

  it("fails if no description is provided", () => {
    delete req.body.description;

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: '"description" is required',
          path: ["description"],
        },
      ],
    });
  });

  it("fails if no description is empty", () => {
    req.body.description = "";

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: '"description" is not allowed to be empty',
          path: ["description"],
        },
      ],
    });
  });

  it("fails if no method is provided", () => {
    delete req.body.method;

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: '"method" is required',
          path: ["method"],
        },
      ],
    });
  });

  it("fails if invalid method is provided", () => {
    req.body.method = "something else";

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: '"method" must be one of [debit_card, credit_card]',
          path: ["method"],
        },
      ],
    });
  });

  it("fails if no value is provided", () => {
    delete req.body.value;

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: '"value" is required',
          path: ["value"],
        },
      ],
    });
  });

  it("fails if invalid value is provided", () => {
    req.body.value = "something else";

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: '"value" must be a number',
          path: ["value"],
        },
      ],
    });
  });
});
