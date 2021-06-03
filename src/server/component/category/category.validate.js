import { validate, ValidationError, Joi } from 'express-validation'
const checkReqCategoryName = {
    body: Joi.object({
        name: Joi.string()
            .required(),
    }),
}
export {
    checkReqCategoryName
};