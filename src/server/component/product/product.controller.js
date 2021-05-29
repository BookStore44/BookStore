import productModel from './product.model.js'

import { pagination, role, lock, status } from '../../const/status.js'
import { success } from '../response/success.js'
import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
const createProduct = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, price, categoryId } = req.body;
        const product = await productModel.create({
            name,
            category: categoryId,
            price,
        });

        return success(res, {
            httpCode: statusCode.CREATED,
            message: 'successfully added product',
            data: product
        })
    } catch (err) {
        next(err);
    }
}
const deleteProductByName = async (req, res, next) => {
    try {
        const name = req.body.name;
        const product = await productModel.findOneAndUpdate({ name }, { lock: lock.ACTIVE });
        return success(res, {
            httpCode: statusCode.OK,
            message: 'Delete Product successfully',
            data: product
        })
    } catch (err) {
        next(err);
    }
};
const getListProductByCategoryId = async (req, res, next) => {
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
            await productModel.countDocuments(condition),
            await productModel.find(condition, null, { skip: offset, limit: pagination.LIMIT }).populate('category').exec(),
        ]);
        const nPages = Math.ceil(total / pagination.LIMIT);
        if (page > nPages)
            throw new myError({
                httpCode: statusCode.NOT_FOUND,
                description: errorList.PAGE_NOT_FOUND,
            });
        else {
            return success(res, {
                httpCode: statusCode.OK,
                data: rows
            })
        }
    } catch (err) {
        next(err);
    }
}
const uploadImage = async (req, res, next) => {
    try {
        const files = req.files;
        if (files) {
            //console.log(files.length());
            //for (i = 0; i <= files.length(); i++)
            console.log(req.files[0].filename);
            const imgPath = 'public/images/' + files[0].filename;
            const { _id } = req.query;
            //console.log(_id);
            //await UserModel.updateOne({ _id: req.user._id }, { avatar: req.file.filename });
            await productModel.updateOne({ _id }, { image: imgPath });
            return success(res, {
                httpCode: statusCode.OK,
                message: 'Updated image'
            })
        }
        else {
            throw new myError({
                name: req.file,
                httpCode: statusCode.NOT_FOUND,
                description: errorList.FIND_ERROR,
            });
        }
    }
    catch (err) {
        next(err)
    }
};

export default {
    createProduct,
    deleteProductByName,
    getListProductByCategoryId,
    uploadImage
}