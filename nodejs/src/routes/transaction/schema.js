const Joi = require("joi");
const { validateExpirationDate } = require("./util");

const onlyDigitRegex = /^\d+$/;
const onlyTextAndSpacesRegex = /^\w+(?:\s+\w+)*$/;

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
