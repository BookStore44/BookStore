import UserModel from './user.model.js'
import jwt from 'jsonwebtoken'
import { validate, ValidationError, Joi } from 'express-validation'
import { role, lock, status } from '../../const/status.js'
import restoClient from '../../const/restoClient.js'

const isExistUsername = async (req, res, next) => {
  try {
    const username = req.body.username;
    const data = await UserModel.findOne({ username });
    if (data) {
      return restoClient.resJson(res, {
        status: 400,
        msg: 'Username da ton tai'
      })
    }
    next();
  }
  catch (err) {
    return restoClient.resJson(res, {
      status: 500,
      err: err,
      msg: 'loi server'
    })
  }
}
const checktoken = (req, res, next) => {//check client da dang nhap chua
  try {
    const token = req.headers.authorization;
    const ketqua = jwt.verify(token, 'matkhau');//vi day la ham minh dung dong bo(neu goi callback thi ko dong bo). Muon test loi ham dong bo thi dung try catch
    if (ketqua) next();////////////////////loi, ko co else
  }
  catch (err) {
    return restoClient.resJson(res, {
      msg: 'ban can phai login'
    })
  }
}


export default {
  isExistUsername,
  checktoken,
};