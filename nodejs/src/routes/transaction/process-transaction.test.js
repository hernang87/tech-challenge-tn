const axios = require("axios");
const processTransaction = require("./process-transaction");

jest.mock("axios");

describe("processTransaction", () => {
  it("should process a transaction and create payables", async () => {
    const req = {
      body: {
        /* mock request body */
      },
    };
    const res = {
      /* mock response object */
    };

    // Mock the axios post request
    axios.post.mockResolvedValueOnce({
      /* mock response from external API */
    });

    // Mock the createPayables function
    const createPayablesMock = jest.spyOn(createPayables, "createPayables");
    createPayablesMock.mockResolvedValueOnce({
      /* mock response from createPayables */
    });

    // Call the processTransaction function
    await processTransaction(req, res);

    // Assert that the axios post request was called with the correct data
    expect(axios.post).toHaveBeenCalledWith(/* expected post data */);

    // Assert that the createPayables function was called with the correct data
    expect(
      createPayablesMock
    ).toHaveBeenCalledWith(/* expected createPayables data */);

    // Assert that the response was sent with the correct data
    expect(res.status).toHaveBeenCalledWith(/* expected status code */);
    expect(res.json).toHaveBeenCalledWith(/* expected response data */);
  });
});
