const Joi = require("joi");

const onlyDigitRegex = /^\d+$/;
const onlyTextAndSpacesRegex = /^\w+(?:\s+\w+)*$/;

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

const schema = Joi.object({
  cardCvv: Joi.string().length(3).regex(onlyDigitRegex).required(),
  cardExpirationDate: Joi.string()
    .regex(/^\d{2}\/\d{2}$/)
    .custom(validateExpirationDate)
    .required(),
  cardHolderName: Joi.string().regex(onlyTextAndSpacesRegex).required(),
  cardNumber: Joi.string().regex(onlyDigitRegex).required(),
  description: Joi.string().required(),
  method: Joi.string().valid("debit_card", "credit_card").required(),
  value: Joi.number().positive().required(),
});

module.exports = schema;
