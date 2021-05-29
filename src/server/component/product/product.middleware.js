import ProductModel from './product.model.js'
import categoryModel from '../category/category.model.js'
import jwt from 'jsonwebtoken'
import { validate, ValidationError, Joi } from 'express-validation'
import { role, lock, status } from '../../const/status.js'
import {success} from '../response/success.js'
import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
const checkExistProductName = async (req, res, next) => {
    try {
        const name = req.body.name;
        const data = await ProductModel.findOne({ name, lock: lock.DISABLE })
        if (data) {
            throw new myError({
                name:'product name already exist',
                httpCode: statusCode.ALREADY_EXITS,
                description: errorList.ALREADY_EXITS,
            });
        }
        else next();
    } catch (error) {
        next(err);
    }
}
const checkExistCategoryName = async (req, res, next) => {
    try {
        const { categoryname } = req.body;
        
        const category = await categoryModel.findOne({ name: categoryname, lock: lock.DISABLE })
   
        if (category) {
            req.body.categoryId = category.id;
            next();
        }
        else {
            throw new myError({
                name:'category name already exist',
                httpCode: statusCode.ALREADY_EXITS,
                description: errorList.ALREADY_EXITS,
            });
        }
    } catch (error) {
        next(err)
    }
}

export default {
    checkExistProductName,
    checkExistCategoryName,
};