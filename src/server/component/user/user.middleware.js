import userModel from './user.model.js'
import jwt from 'jsonwebtoken'

import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
const isExistUsername = async (req, res, next) => {
  try {
    const username = req.body.username;
    const data = await userModel.findOne({ username });
    if (data) {
      throw new myError({
        name: 'Username already exists',
        httpCode: statusCode.ALREADY_EXITS,
        description: errorList.ALREADY_EXITS,
      });

    }
    else next();
  }
  catch (err) {
    next(err)
  }
}
const checktoken = (req, res, next) => {//check client da dang nhap chua
  try {
    const token = req.headers.authorization;
    const ketqua = jwt.verify(token, 'matkhau');//vi day la ham minh dung dong bo(neu goi callback thi ko dong bo). Muon test loi ham dong bo thi dung try catch
    if (ketqua) next();
    else {
      throw new myError({
        name: 'you need to login',
        httpCode: statusCode.UNAUTHORIZED,
        description: errorList.AUTHENTICATE_FAILD,
      });
    }
  }
  catch (err) {
    next(err)
  }
}


export default {
  isExistUsername,
  checktoken,
};