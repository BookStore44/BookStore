import OrderModel from '../order/order.model.js'
import NotifyModel from './notify.model.js'
import restoClient from '../../const/restoClient.js'
import {pagination} from '../../const/status.js'
import mongoose from 'mongoose'
const getallNotify = async (req, res) => {
    try {
        const page = +req.query.page || 0;
        if (page < 0) page = 1;
        const offset = page * pagination.LIMIT;
        const [total, rows] = await Promise.all([
            await NotifyModel.countDocuments(),
            await NotifyModel.find().skip(offset).limit(pagination.LIMIT),
        ]);
        const nPages = Math.ceil(total / pagination.LIMIT);
        if (page > nPages)
            return restoClient.resJson(res, {
                status: 404,
                msg: 'page does not exist'
            })

        return restoClient.resJson(res, {
            status: 200,
            msg: 'list notify',
            data: rows,

        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            err: err
        })
    }
}
const getNotifyById = async (req, res) => {
    try {
        const notifyId = req.query.notifyId;
        const notify = await NotifyModel.findById(notifyId).populate('orderId').exec();

        return restoClient.resJson(res, {
            status: 200,
            data: notify
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            err: err
        })
    }
}


export default{
    getallNotify,
    getNotifyById
}