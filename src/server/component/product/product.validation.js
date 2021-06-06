import {Joi } from 'express-validation'
const checkReqProduct = {
    body: Joi.object({
        name: Joi.string()
            .required(),
        categoryName: Joi.string()
            .required(),
        price: Joi.number()
        .required(),
    }),
}
export {
    checkReqProduct
};