import { Joi } from 'express-validation'
const validateUser = {
    body: Joi.object({
        username: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
    }),
}
const validateRole = {
    body: Joi.object({
        role: Joi.string()
            .regex(/[0-2]{1}/)
            .required(),
    }),
}

export {
    validateUser,
    validateRole,
};