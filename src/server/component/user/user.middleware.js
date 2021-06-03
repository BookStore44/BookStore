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



export default {
  isExistUsername
};