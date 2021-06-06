import { pagination, lock } from '../const/status.js'
import {myError} from '../component/response/myError.js'
import statusCode from '../component/response/statusCode.js'
import { errorList } from '../component/response/errorList.js'
export const service = (model) => {
    const getList = async (query) => {
        try {
            const {condition, page, sort , populate } = query;
            if (page < 0) page = 1;
            const offset = page * pagination.LIMIT;
            const [total, rows] = await Promise.all([
                await model.countDocuments(condition),
                await model.find(condition, null, {sort, skip: offset, limit: pagination.LIMIT }).populate(populate).exec(),
            ]);
            const nPages = Math.ceil(total / pagination.LIMIT);
            return [rows, nPages]
        } catch (error) {
            throw error;
        }
    };
    const getOne = async(query)=>{
        try {
          const { condition,populate, dataGet, option } = query;
          let item = await model
            .findOne(condition, dataGet, option)
            .populate(populate);
          return item;
        } catch (error) {
          throw error;
        }
      }
      const checkExist = async (query) => {
        try {
            const {name} = query;
            const data = await model.findOne({
                name
            })
            if (data) {
                throw new myError({
                    name: 'already exists',
                    httpCode: statusCode.ALREADY_EXITS,
                    description: errorList.ALREADY_EXITS,
                });
            } else return true;
        } catch (err) {
            throw err;
        }
    }
    return {
        getList,
        getOne,
        checkExist
    };
};