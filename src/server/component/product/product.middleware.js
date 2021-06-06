import ProductModel from './product.model.js'
import categoryModel from '../category/category.model.js'

import { lock} from '../../const/status.js'

import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
import { isValidObjectId } from "mongoose";
const checkExistProduct = async (req, res, next) => {
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
    } catch (err) {
        next(err);
    }
}
const checkExistCategory = async (req, res, next) => {
    try {
        const { categoryName } = req.body;
        
        const category = await categoryModel.findOne({ name: categoryName, lock: lock.DISABLE })
   
        if (category) {
            req.body.categoryId = category.id;
            next();
        }
        else {
            throw new myError({
                name:'can not find category',
                httpCode: statusCode.NOT_FOUND,
                description: errorList.FIND_ERROR,
            });
        }
    } catch (err) {
        next(err)
    }
}
const validateId = (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
        throw new myError({
            name: req.params.id,
            httpCode: statusCode.BAD_REQUEST,
            description: errorList.MUST_BE_OBJECTID,
        });
    }
    next();
};
export default {
    checkExistProduct,
    checkExistCategory,
    validateId
};