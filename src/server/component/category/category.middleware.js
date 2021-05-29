import categoryModel from './category.model.js'
import jwt from 'jsonwebtoken'
import { role, lock, status } from '../../const/status.js'
import { success } from '../response/success.js'
import {myError} from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import {errorList} from '../response/errorList.js'
const checkExistCategoryName = async (req, res, next) => {
    try {
        const name = req.body.name;
        const data = await categoryModel.findOne({ name })
        if (data) {
            throw new myError({
                name: 'name category already exists',
                httpCode: statusCode.ALREADY_EXITS,
                description: errorList.ALREADY_EXITS,
            });
        }
        else next();
    } catch (err) {
        next(err);
    }
}

export default {
    checkExistCategoryName,
};