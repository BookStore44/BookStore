import categoryModel from './category.model.js'
import productModel from '../product/product.model.js'
import { pagination, lock } from '../../const/status.js'
import { success } from '../response/success.js'
import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
import { categoryService } from './category.service.js'
const addCategory = async (req, res, next) => {
    try {
        await categoryService.checkExist(req.body);
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
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await productModel.updateMany({ category: id }, { "$set": { lock: lock.ACTIVE } });
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
        const categories = await categoryService.getList({ page, condition: { lock: lock.DISABLE } });
        return success(res, {
            httpCode: statusCode.OK,
            data: categories,
        })
    }
    catch (err) {
        next(err);
    }
}
const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const category = await categoryModel.findById(id);
        return success(res, {
            httpCode: statusCode.OK,
            data: category,
        })
    }
    catch (err) {
        next(err);
    }
}
const updateCategory = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const { name } = req.body;
        const category = await categoryModel.findOneAndUpdate({ _id: id }, { name })
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
    addCategory,
    deleteCategory,
    getListCategory,
    getCategory,
    updateCategory
}