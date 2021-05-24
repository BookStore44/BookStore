import productModel from '../product/product.model.js'
import restoClient from '../../const/restoClient.js'
import {pagination} from '../../const/status.js'
const searchProduct = async (req, res) => {
    try {
        const {productname, sort} = req.query;
        const page = +req.query.page || 0;
        if (page < 0) page = 1;
        const offset = page * pagination.LIMIT;
        const [total, rows] = await Promise.all([
            await productModel.countDocuments(),
            await productModel.find({ productname: { $regex: productname, $options: 'i' } }).sort(`${sort}`).skip(offset).limit(pagination.LIMIT),
        ]);
        const nPages = Math.ceil(total / pagination.LIMIT);
        if (page > nPages)
            return restoClient.resJson(res, {
                status: 404,
                msg: 'page does not exist'
            })
        return restoClient.resJson(res, {
            status: 200,
            data: rows,
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            err: err
        })
    }
}
export {
    searchProduct,
}