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
                status: 400,
                msg: 'category name already exists'
            })
        }
        next();
    } catch (error) {
        restoClient.resJson(res, {
            status: 500,
            msg: 'server error'
        })
    }
}

export default{
    isExistcategoryname,
};