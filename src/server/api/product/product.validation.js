import { validate, ValidationError, Joi } from 'express-validation'
const checkReqProduct = {
    body: Joi.object({
        productname: Joi.string()
            .required(),
        categoryname: Joi.string()
            .required(),
    }),
}
const checkReqProductName = {
    body: Joi.object({
        productname: Joi.string()
            .required(),
    }),
}
export {
    checkReqProduct,
    checkReqProductName
};