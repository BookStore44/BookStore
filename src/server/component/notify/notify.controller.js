import notifyModel from './notify.model.js'
import { success } from '../response/success.js'
import { pagination } from '../../const/status.js'
import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
import { notifyService } from './notify.service.js'
const getListNotify = async (req, res, next) => {
    try {
        const page = +req.params.page || 0;
        const notifies = await notifyService.getList({ page, sort: { 'createdAt': -1 } });
        return success(res, {
            httpCode: statusCode.OK,
            data: notifies,
            message: 'list notify'
        })
    } catch (err) {
        next(err)
    }
}
const getNotifyById = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const notify = await notifyModel.findById(_id).populate('orderId').exec();
        return success(res, {
            httpCode: statusCode.OK,
            data: notify
        })
    } catch (err) {
        return success(res, {
            httpCode: 500,
            err: err
        })
    }
}
export default {
    getListNotify,
    getNotifyById
}