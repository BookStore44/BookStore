import OrderModel from '../order/order.model.js'
import notifyModel from './notify.model.js'
import {success} from '../response/success.js'
import { pagination } from '../../const/status.js'
import {myError} from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import {errorList} from '../response/errorList.js'
import mongoose from 'mongoose'
const getAllNotify = async (req, res, next) => {
    try {
        const page = +req.query.page || 0;
        if (page < 0) page = 1;
        const offset = page * pagination.LIMIT;
        const [total, rows] = await Promise.all([
            await notifyModel.countDocuments(),
            await notifyModel.find(null, null, { sort: { 'createdAt': -1 }, skip: offset, limit: pagination.LIMIT }),
        ]);
        const nPages = Math.ceil(total / pagination.LIMIT);
        if (page > nPages) {
            throw new myError({
                httpCode: statusCode.NOT_FOUND,
                description: errorList.PAGE_NOT_FOUND,
            });
        }
        else {
            return success(res, {
                httpCode: statusCode.OK,
                message: 'list notify',
                data: rows,
            })
        }
    } catch (err) {
        next(err)
    }
}
const getNotifyById = async (req, res, next) => {
    try {
        const {_id} = req.query;
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
    getAllNotify,
    getNotifyById
}