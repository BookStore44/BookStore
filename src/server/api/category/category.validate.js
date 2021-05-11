import { validate, ValidationError, Joi } from 'express-validation'
const checkReqCatename = {
    body: Joi.object({
        categoryname: Joi.string()
            .required(),
    }),
}
export {
    checkReqCatename
};