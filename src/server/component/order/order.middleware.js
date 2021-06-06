import orderModel from './order.model.js'

import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'

const checkOrder = async (req, res, next) => {//check client da dang nhap chua
    try {
        const { orderId, status } = req.body;
        const orderCheck = await orderModel.findById(orderId);
        const statusNew = orderCheck.status + 1;
        if (statusNew == status && status < 4) next();
        else {
            throw new MyError({
                name: 'new status is not valid',
                httpCode: statusCode.BAD_REQUEST,
                description: errorList.VALIDATE_STATUS,
            });
        }
    }
    catch (err) {
        next(err);
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
    checkOrder,
    validateId
};