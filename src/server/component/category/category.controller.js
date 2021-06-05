import categoryModel from './category.model.js'
import productModel from '../product/product.model.js'
import { pagination, lock } from '../../const/status.js'
import { success } from '../response/success.js'
import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
import { categoryService } from './category.service.js'
const createCategory = async (req, res, next) => {
    try {
        const category = await categoryModel.create({
            name: req.body.name,
        })
        return success(res, {
            httpCode: statusCode.CREATED,
            message: 'create category successful',
            data: category
        })
    } catch (error) {
        next(error)
    }
}
const deleteCategoryById = async (req, res, next) => {
    try {
        const { _id } = req.body;
        await productModel.updateMany({ category: _id }, { "$set": { lock: lock.ACTIVE } });
        const category = await categoryModel.findOneAndUpdate({ _id }, { lock: lock.ACTIVE })
        if (!category) {
            throw new myError({
                name: 'category does not exist',
                httpCode: statusCode.NOT_FOUND,
                description: errorList.FIND_ERROR,
            });

        }
        else {
            return success(res, {
                httpCode: statusCode.OK,
                message: 'Delete category successfully',
                data: category
            })
        }
    } catch (err) {
        next(err)
    }
};
const getListCategory = async (req, res, next) => {
    try {
        const page = +req.params.page || 0;
        const categories = await categoryService.getList({page, condition: {lock: lock.DISABLE}});
        return success(res, {
            httpCode: statusCode.OK,
            data: categories,
        })
    }
    catch (err) {
    next(err);
}
}
const updateCategoryNameById = async (req, res, next) => {
    try {
        const { _id, name } = req.body;
        const category = await categoryModel.findOneAndUpdate({ _id }, { name })
        if (!category) {
            throw new myError({
                name: 'category does not exist',
                httpCode: statusCode.NOT_FOUND,
                description: errorList.FIND_ERROR,
            });

        }
        else {
            return success(res, {
                httpCode: statusCode.OK,
                message: 'Update category successfully',
                data: { _id, name }
            })
        }
    } catch (err) {
        next(err)
    }
};
export default {
    createCategory,
    deleteCategoryById,
    getListCategory,
    updateCategoryNameById
}