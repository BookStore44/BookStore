import productModel from '../product/product.model.js'
import restoClient from '../../const/restoClient.js'
const searchProduct = async (req, res) => {
    try {
        const productname=req.query.productname;
        const search= await productModel.findOne({ "productname" : { $regex: productname, $options: 'i' } });
        return restoClient.resJson(res, {
            status: 200,
            data: search,
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