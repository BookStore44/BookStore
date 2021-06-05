import {Joi } from 'express-validation'
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
const checkReqProductId = {
    body: Joi.object({
        _id: Joi.string()
            .required(),
    }),
}
export {
    checkReqProduct,
    checkReqProductId
};