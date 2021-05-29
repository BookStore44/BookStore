import cartModel from './cart.model.js'
import jwt from 'jsonwebtoken'
import { validate, ValidationError, Joi } from 'express-validation'
import {role,lock,status} from '../../const/status.js'
import {success} from '../response/success.js'
import {myError} from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import {errorList} from '../response/errorList.js'
import productModel from '../product/product.model.js'
const checkExistProductId = async (req, res, next) => {
    try {
        const {products} = req.body;
        console.log(products);
        for(const i in products){
            const data = await productModel.findOne({_id: products[i]._id });
            if (!data) {
                throw new myError({
                    name: "product not found",
                    httpCode: statusCode.NOT_FOUND,
                    description: errorList.FIND_PRODUCT_ERROR,
                });
            }  
        }
        next();
    } catch (err) {
        next(err);
    }
}
export default {
    checkExistProductId,
};