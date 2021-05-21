import ProductModel from './product.model.js'
import CateModel from '../category/category.model.js'
import { pagination, role, lock, status } from '../../const/status.js'
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
            msg: 'successfully added product'
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
            msg: 'Delete Product successfully'
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            err: err,
            msg: 'error when deleting Product'
        })
    }
};
const allProductByIdCategory = async (req, res) => {
    try {
        const page = +req.query.page || 0;
        if (page < 0) page = 1;
        const offset = page * pagination.LIMIT;
        const condition = {};
        const categoryid = req.query.category;
        if (categoryid && categoryid !== '') {
            condition.category = categoryid;
        }
        condition.lock = lock.DISABLE;
        const [total, rows] = await Promise.all([
            await ProductModel.countDocuments(condition),
            await ProductModel.find(condition).populate('category').skip(offset).limit(pagination.LIMIT).exec(),
        ]);
        const nPages = Math.ceil(total / pagination.LIMIT);
        if (page > nPages)
            return restoClient.resJson(res, {
                status: 404,
                msg: 'page does not exist'
            })
        return restoClient.resJson(res, {
            status: 200,
            data: rows
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Can not get list of Product',
            err: err
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
            status: 200,
            msg: 'Updated ava'
        })
    } else {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Unable to update avatar'
        })
    }
};

export default {
    createProduct,
    deleteByProductName,
    allProductByIdCategory,
    uploadImage
}