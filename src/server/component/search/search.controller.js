import productModel from '../product/product.model.js'
import restoClient from '../response/success.js'
import { pagination } from '../../const/status.js'
import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
import { success } from '../response/success.js'
const searchProduct = async (req, res, next) => {
    try {
        const { name, sort } = req.query;
        const page = +req.query.page || 0;
        if (page < 0) page = 1;
        const offset = page * pagination.LIMIT;
        const [total, rows] = await Promise.all([
            await productModel.countDocuments(),
            await productModel.find({ name: { $regex: name, $options: 'i' } }, null, { sort: { price: `${sort}` }, skip: offset, limit: pagination.LIMIT })
        ]);
        const nPages = Math.ceil(total / pagination.LIMIT);
        if (page > nPages) {
            throw new myError({
                httpCode: statusCode.NOT_FOUND,
                description: errorList.PAGE_NOT_FOUND,
            });
        }
        else {
            return success(res, {
                httpCode: statusCode.OK,
                data: rows,
            })
        }
    } catch (err) {
        next(err);
    }
}
export {
    searchProduct,
}