import { validate, ValidationError, Joi } from 'express-validation'
const validateCategory = {
    body: Joi.object({
        name: Joi.string()
        .regex(/[a-zA-Z0-9]{1,30}/)    
        .required(),        
    }),
}
export {
    validateCategory
};