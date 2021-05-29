import { validate, ValidationError, Joi } from 'express-validation'
const checkReqCatename = {
    body: Joi.object({
        name: Joi.string()
            .required(),
    }),
}
export {
    checkReqCatename
};