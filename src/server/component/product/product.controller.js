import productModel from './product.model.js'

import { pagination, role, lock, status } from '../../const/status.js'
import { success } from '../response/success.js'
import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
import {productService} from './product.service.js'
const createProduct = async (req, res, next) => {
    try {
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
const updateProduct = async (req, res, next) => {
    try {
        const {id}=req.params;
        const {name, price, category}=req.body;
        const product=await productModel.findOneAndUpdate({_id:id}, {name, price, category});
        success(res, {
            httpCode: statusCode.OK,
            data: product,
            message: 'success'
        })
    } catch (err) {
        next(err)
    }
}
const deleteProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await productModel.findOneAndUpdate({ _id:id }, { lock: lock.ACTIVE });
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
        const {page, category} = req.params ;
        const notifies = await productService.getList({ condition: {lock: lock.DISABLE, category}, page, populate: 'category'});
        console.log(notifies)
            return success(res, {
                httpCode: statusCode.OK,
                data: notifies
            })
        
    } catch (err) {
        next(err);
    }
}
const uploadImage = async (req, res, next) => {
    try {
        const files = req.files;
        if (files) {
            console.log(req.files[0].filename);
            const imgPath = 'public/images/' + files[0].filename;
            const { _id } = req.query;
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
export default {
    createProduct,
    deleteProduct,
    getListProductByCategoryId,
    uploadImage,
    searchProduct,
    updateProduct
}