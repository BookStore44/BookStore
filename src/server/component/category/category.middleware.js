import categoryModel from './category.model.js'
import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
import { isValidObjectId } from "mongoose";
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
    validateId,
};