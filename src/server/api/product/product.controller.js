import ProductModel from './product.model.js'
import CateModel from '../category/category.model.js'
import status from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
const createProduct = async (req, res) => {
    try {
        const category = await CateModel.findOne({ categoryname: req.body.categoryname })
        ProductModel.create({
            productname: req.body.productname,
            category: category._id,
        });
        restoClient.resJson(res, {
            status: 200,
            msg: 'them product thanh cong'
        })
    } catch (err) {
        restoClient.resJson(res, {
            status: 500,
            err: err
        })
    }
}
const deleteByProductName = async (req, res) => {
    try {
        await ProductModel.findOneAndUpdate({ productname: req.body.productname }, { lock: status.lock.active });
        restoClient.resJson(res, {
            status: 200,
            msg: 'Xóa Product thành công'
        })
    } catch (err) {
        restoClient.resJson(res, {
            status: 500,
            err: err,
            msg: 'loi khi xoa Product'
        })
    }
};
const allProductByIdCategory = async (req, res) => {
    try {
        const condition = {};
        if (req.query.category && req.query.category !== '') {
            condition.category = req.query.category;
        }
        condition.lock = status.lock.disable;
        console.log(condition);
        const product = await ProductModel.find(condition).populate('category').exec();
        restoClient.resJson(res, {
            status: 200,
            data: product,
        })
    } catch (err) {
        restoClient.resJson(res, {
            status: 500,
            msg: 'Không thể lấy danh sách Product',
        })
    }
}

export {
    createProduct,
    deleteByProductName,
    allProductByIdCategory,
}