import { validate, ValidationError, Joi } from 'express-validation'
const checkReqProduct = {
    body: Joi.object({
        name: Joi.string()
            .required(),
        category: Joi.string()
            .required(),
        price: Joi.number()
        .required(),
    }),
}
const checkReqProductName = {
    body: Joi.object({
        name: Joi.string()
            .required(),
    }),
}
export {
    checkReqProduct,
    checkReqProductName
};