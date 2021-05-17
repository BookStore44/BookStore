import OrderModel from '../order/order.model.js'
import NotifyModel from './notify.model.js'
import { role, lock, status } from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
import mongoose from 'mongoose'
const getallNotify = async (req, res) => {
    try {
        const allnotify = await OrderModel.find();

        return restoClient.resJson(res, {
            status: 200,
            msg: 'list notify',
            data: allnotify,

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
        const notify = await NotifyModel.findById(notifyId);

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