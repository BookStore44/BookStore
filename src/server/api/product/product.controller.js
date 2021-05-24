import ProductModel from './product.model.js'
import CateModel from '../category/category.model.js'
import { pagination, role, lock, status } from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
const createProduct = async (req, res) => {
    try {
        const { categoryname, name, price } = req.body;
        const category = await CateModel.findOne({ categoryname })
        ProductModel.create({
            name,
            category: category._id,
            price,
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
        const name = req.body.name;
        await ProductModel.findOneAndUpdate({ name }, { lock: lock.ACTIVE });
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
    const files = req.files;
    if (files) {
        //console.log(files.length());
        //for (i = 0; i <= files.length(); i++)
        console.log(req.files[0].filename);
        const imgPath = 'public/images/' + files[0].filename;
        const { _id } = req.query;
        //console.log(_id);
        //await UserModel.updateOne({ _id: req.data._id }, { avatar: req.file.filename });
        await ProductModel.updateOne({ _id }, { avatar: imgPath });
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