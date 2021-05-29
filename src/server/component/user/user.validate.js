import { Joi } from 'express-validation'
const checkReqUser = {
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
const checkReqId = {
    body: Joi.object({
        _id: Joi.string()
            .required(),
    }),
}
export {
    checkReqUser,
    checkReqUsername,
    checkReqId
};