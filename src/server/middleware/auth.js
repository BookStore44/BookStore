import UserModel from '../api/user/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {role,lock,status} from '../const/status.js'
import restoClient from '../const/restoClient.js'
import mongoose from 'mongoose'
const checkLogin = async (req, res, next) => { //kiem tra tai khoan nay da dang nhap hay chua
    try {
        const token = req.headers.authorization.split(' ')[1];
        //console.log(token);
        const verify = jwt.verify(token, 'matkhau');
        //console.log(data.username)
        const data = await UserModel.findOne({ username: verify.username })
        if (data) {
            req.data = data;
            next();
            // console.log(data);
            // console.log(typeof (req.body.password));
            // console.log(typeof (data.password));
            // const passwordIsValid = bcrypt.compareSync(
            //     req.body.password,
            //     data.password
            // );

            // console.log(passwordIsValid);
            // if (!passwordIsValid) {
            //     return res.status(401).send({
            //         accessToken: null,
            //         message: "Invalid Password!"
            //     });
            // }

            
        }
        else restoClient.resJson(res, {
            status: 403,
            msg: 'ban chua dang nhap'
        })


    } catch (err) {
        console.log(err);
        restoClient.resJson(res, {
            status: 400,
            err: err,
            msg: 'token khong hop le'
        })
    }
}
const isManager = (req, res, next) => {
    if (req.data.role === role.MANAGER) next()
    else
        restoClient.resJson(res, {
            status: 403,
            msg: 'khong du quyen'
        })
}
const isStaffOrManager = (req, res, next) => {
    if (req.data.role === role.STAFF || req.data.role === role.MANAGER) next()
    else
        restoClient.resJson(res, {
            status: 403,
            msg: 'khong du quyen'
        })
}
const isUser = (req, res, next) => {
    if (req.data.role === role.USER) next()
    else
        restoClient.resJson(res, {
            status: 403,
            msg: 'khong du quyen'
        })
}
export default{
    checkLogin,
    isManager,
    isStaffOrManager,
    isUser
}