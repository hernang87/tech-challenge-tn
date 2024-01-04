const axios = require("axios");
const moment = require("moment");
const createPayables = require("./create");
const PayablesFactory = require("./payables-factory");

jest.mock("axios");

describe("createPayables", () => {
  const transaction = {
    value: "100.00",
  };

  it("should create payables and make a POST request to the PAYABLES endpoint", async () => {
    const payable = {
      createDate: moment().format("DD/MM/YYYY"),
      status: "paid",
      getTotal: jest.fn().mockReturnValue(90),
    };

    const expectedRequestBody = {
      create_date: payable.createDate,
      discount: "10.00",
      status: payable.status,
      subtotal: transaction.value,
      total: "90.00",
    };

    PayablesFactory.create = jest.fn().mockReturnValue(payable);

    const success = { data: "success" };

    axios.post.mockResolvedValueOnce(success);

    const result = await createPayables(transaction);

    expect(PayablesFactory.create).toHaveBeenCalledWith(transaction);
    expect(payable.getTotal).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      process.env.PAYABLES,
      expectedRequestBody
    );
    expect(result).toEqual(success);
  });

  it("should throw an error if PayablesFactory.create throws an error", async () => {
    const errorMessage = "PayablesFactory.create error";

    PayablesFactory.create.mockImplementationOnce(() => {
      throw new Error(errorMessage);
    });

    await expect(createPayables(transaction)).rejects.toThrowError(
      errorMessage
    );
  });
});
