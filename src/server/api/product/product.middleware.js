import ProductModel from './product.model.js'
import jwt from 'jsonwebtoken'
import { validate, ValidationError, Joi } from 'express-validation'
import status from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
const isExistproductname = async (req, res, next) => {
    try {
        const data = await ProductModel.findOne({ productname: req.body.productname })
        if (data) {
            return restoClient.resJson(res, {
                status: 500,
                msg: 'productname da ton tai',
            })
        }
        else next();
    } catch (error) {
        restoClient.resJson(res, {
            status: 500,
            msg: 'loi server',
        })
    }
}
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
    isExistproductname,
    checkReqProduct,
    checkReqProductName
};