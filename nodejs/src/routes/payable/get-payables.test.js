const axios = require("axios");
const moment = require("moment");
const getPayables = require("./get-payables");
const { get } = require("lodash");

jest.mock("axios");

const any = {};

describe("getPayables", () => {
  const res = {
    send: jest.fn(),
    status: jest.fn(() => res),
  };

  it("should return an object with the total of fees, paid and waiting funds", async () => {
    const payables = [
      {
        create_date: moment().subtract(2, "month").format("DD/MM/YYYY"),
        discount: "10.00",
        status: "paid",
        subtotal: "100.00",
        total: "90.00",
      },
      {
        create_date: moment().subtract(2, "month").format("DD/MM/YYYY"),
        discount: "10.00",
        status: "paid",
        subtotal: "100.00",
        total: "90.00",
      },
      {
        create_date: moment().add(1, "month").format("DD/MM/YYYY"),
        discount: "20.00",
        status: "waiting_funds",
        subtotal: "120.00",
        total: "100.00",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: payables });

    await getPayables(any, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      feesTotal: "40.00",
      paidTotal: "180.00",
      waitingFundsTotal: "100.00",
    });
  });

  it("should return zero if not payables were found", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    await getPayables(any, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.send).toHaveBeenCalledWith({
      feesTotal: "0.00",
      paidTotal: "0.00",
      waitingFundsTotal: "0.00",
    });
  });

  it("should throw an error if axios.get throws an error", async () => {
    const errorMessage = "axios.get error";

    axios.get.mockImplementationOnce(() => {
      throw new Error(errorMessage);
    });

    await getPayables(any, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
  });
});
