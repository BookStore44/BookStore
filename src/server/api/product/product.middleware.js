import ProductModel from './product.model.js'
import jwt from 'jsonwebtoken'
import { validate, ValidationError, Joi } from 'express-validation'
import {role,lock,status} from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
const isExistproductname = async (req, res, next) => {
    try {
        const productname= req.body.productname;
        const data = await ProductModel.findOne({ productname})
        if (data) {
            return restoClient.resJson(res, {
                status: 400,
                msg: 'product name leather',
            })
        }
        next();
    } catch (error) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'server error',
        })
    }
}

export default{
    isExistproductname,
};