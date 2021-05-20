import ProductModel from './product.model.js'
import CateModel from '../category/category.model.js'
import { role, lock, status } from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
const createProduct = async (req, res) => {
    try {
        const categoryname = req.body.categoryname;
        const productname = req.body.productname;
        const category = await CateModel.findOne({ categoryname })
        ProductModel.create({
            productname,
            category: category._id,
        });
        return restoClient.resJson(res, {
            status: 200,
            msg: 'them product thanh cong'
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            err: err
        })
    }
}
const deleteByProductName = async (req, res) => {
    try {
        const productname = req.body.productname;
        await ProductModel.findOneAndUpdate({ productname }, { lock: lock.ACTIVE });
        return restoClient.resJson(res, {
            status: 200,
            msg: 'Xóa Product thành công'
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            err: err,
            msg: 'loi khi xoa Product'
        })
    }
};
const allProductByIdCategory = async (req, res) => {
    try {
        const condition = {};
        const categoryid = req.query.category;
        if (categoryid && categoryid !== '') {
            condition.category = categoryid;
        }
        condition.lock = lock.DISABLE;
        console.log(condition);
        const product = await ProductModel.find(condition).populate('category').exec();
        return restoClient.resJson(res, {
            status: 200,
            data: product,
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Không thể lấy danh sách Product',
        })
    }
}
const uploadImage = async (req, res) => {
    if (req.file) {
        const imgPath = 'public/images/' + req.file.filename;
        const userId = req.data._id;
        //await UserModel.updateOne({ _id: req.data._id }, { avatar: req.file.filename });
        await UserModel.updateOne({ _id: userId }, { avatar: imgPath });
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Da cap nhat ava'
        })
    } else {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Không thể cập nhật avatar'
        })
    }
};

export default {
    createProduct,
    deleteByProductName,
    allProductByIdCategory,
    uploadImage
}