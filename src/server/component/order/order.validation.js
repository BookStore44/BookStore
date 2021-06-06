import { Joi } from 'express-validation'
const validateOrder = {
    body: Joi.object({
      phone: Joi.string().length(10).required(),
      address: Joi.string()
        .regex(/[a-zA-Z0-9]{3,50}/)
        .required(),
    }),
  };
  export {
    validateOrder
};