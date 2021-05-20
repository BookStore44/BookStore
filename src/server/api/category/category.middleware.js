import CateModel from './category.model.js'
import jwt from 'jsonwebtoken'
import {role,lock,status} from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
const isExistcategoryname = async (req, res, next) => {
    try {
        const categoryname= req.body.categoryname;
        const data = await CateModel.findOne({ categoryname })
        if (data) {
            return restoClient.resJson(res, {
                status: 500,
                msg: 'categoryname da ton tai'
            })
        }
        next();
    } catch (error) {
        restoClient.resJson(res, {
            status: 500,
            msg: 'loi server'
        })
    }
}

export default{
    isExistcategoryname,
};