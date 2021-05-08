import CateModel from './category.model.js'
import jwt from 'jsonwebtoken'
import { validate, ValidationError, Joi } from 'express-validation'
import status from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
const isExistcategoryname = async (req, res, next) => {
    try {
        const data = await CateModel.findOne({ categoryname: req.body.categoryname })
        if (data) {
            restoClient.resJson(res, {
                status: 500,
                msg: 'categoryname da ton tai'
            })
        }
        else next();
    } catch (error) {
        restoClient.resJson(res, {
            status: 500,
            msg: 'loi server'
        })
    }
}
const checkReqCatename = {
    body: Joi.object({
        categoryname: Joi.string()
            .required(),
    }),
}
export {
    isExistcategoryname,
    checkReqCatename
};