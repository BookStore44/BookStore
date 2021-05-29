import userModel from '../user/user.model.js'
import jwt from 'jsonwebtoken'
import { role, lock } from '../../const/status.js'
import {myError} from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import {errorList} from '../response/errorList.js'

const checkLogin = async (req, res, next) => { //kiem tra tai khoan nay da dang nhap hay chua
    try {
        const token = req.headers.authorization.split(' ')[1];
        //console.log(token);
        const verify = jwt.verify(token, process.env.SECRETKEY);
        //console.log(data.username)
        const user = await userModel.findOne({ username: verify.username, lock: lock.DISABLE })
        if (user) {
            req.user = user;
            next();
        }
        else {
            throw new myError({
                name: 'You are not logged in',
                httpCode: statusCode.UNAUTHORIZED,
                description: errorList.AUTHENTICATE_FAILD,
            });
        }
    } catch (err) {
        next(err);
    }
}
const isManager = (req, res, next) => {
    if (req.user.role === role.MANAGER) next();
    else {
        throw new myError({
            name: 'no permission',
            httpCode: statusCode.UNAUTHORIZED,
            description: errorList.AUTHENTICATE_FAILD,
        });
    }
}
const isStaffOrManager = (req, res, next) => {
    if (req.user.role === role.STAFF || req.user.role === role.MANAGER) next();
    else {
        throw new myError({
            name: 'no permission',
            httpCode: statusCode.UNAUTHORIZED,
            description: errorList.AUTHENTICATE_FAILD,
        });
    }
}
const isUser = (req, res, next) => {
    if (req.user.role === role.USER) next();
    else {
        throw new myError({
            name: 'no permission',
            httpCode: statusCode.UNAUTHORIZED,
            description: errorList.AUTHENTICATE_FAILD,
        });
    }
}
export default {
    checkLogin,
    isManager,
    isStaffOrManager,
    isUser
}