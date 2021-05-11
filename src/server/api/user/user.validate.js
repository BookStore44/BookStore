import { validate, ValidationError, Joi } from 'express-validation'
const loginValidation = {
    body: Joi.object({
        username: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
    }),
}
const checkReqUsername = {
    body: Joi.object({
        username: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
    }),
}
export {
    loginValidation,
    checkReqUsername
};