function validateExpirationDate(value, helpers) {
  const [m, y] = value.split("/");
  const month = Number(m);
  // Assume that all cards are valid until 2099 for this excercise
  const year = `20${Number(y)}`;

  if (isNaN(month) || isNaN(year)) {
    return helpers.message("Expiration date is invalid");
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const isExpired =
    year < currentYear || (year === currentYear && month < currentMonth);

  if (isExpired) {
    return helpers.message("Expiration date is invalid");
  }

  return value;
}

module.exports = {
  validateExpirationDate,
};
