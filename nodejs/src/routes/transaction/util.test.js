const moment = require("moment");
const { validateExpirationDate } = require("./util");

describe("validateExpirationDate", () => {
  const helpers = {
    message: jest.fn(),
  };

  it("should return the value if the expiration date is valid", () => {
    const value = moment().add(2, "years").format("MM/YY");

    const result = validateExpirationDate(value, helpers);

    expect(result).toEqual(value);
    expect(helpers.message).not.toHaveBeenCalled();
  });

  it("should return the value if the expiration date is in the future, but in the current year", () => {
    const value = moment().add(1, "month").format("MM/YY");

    const result = validateExpirationDate(value, helpers);

    expect(result).toEqual(value);
    expect(helpers.message).not.toHaveBeenCalled();
  });

  it("should return an error message if the expiration date is in the past", () => {
    const value = "12/20";

    const result = validateExpirationDate(value, helpers);

    expect(result).toBeUndefined();
    expect(helpers.message).toHaveBeenCalledWith("Expiration date is invalid");
  });

  it("should return an error message if the expiration date is not in the correct format", () => {
    const value = "2022-01-01";

    const result = validateExpirationDate(value, helpers);

    expect(result).toBeUndefined();
    expect(helpers.message).toHaveBeenCalledWith("Expiration date is invalid");
  });
});
