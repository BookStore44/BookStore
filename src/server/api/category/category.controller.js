import CateModel from './category.model.js'
import ProductModel from '../product/product.model.js'
import {pagination, role, lock, status } from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
const createCategory = async (req, res) => {
    try {
        await CateModel.create({
            categoryname: req.body.categoryname,
        })
        return restoClient.resJson(res, {
            status: 200,
            msg: 'create category successful'
        })
    } catch (error) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'error when creating category'
        })
    }
}
const deleteByCate = async (req, res) => {
    try {
        const category = req.body.category;
        await ProductModel.updateMany({ category }, { "$set": { lock: lock.ACTIVE } });
        const data = await CateModel.findOneAndUpdate({ _id: category }, { lock: lock.ACTIVE })
        if (!data) {
            return restoClient.resJson(res, {
                status: 500,
                msg: 'category does not exist'
            })
        }
        return restoClient.resJson(res, {
            status: 200,
            msg: 'Delete category successfully'
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Error when deleting category'
        })
    }
};
const allCategory = async (req, res) => {
    try {
        const page = +req.query.page || 0;
        if (page < 0) page = 1;
        const offset = page * pagination.LIMIT;
        const [total, rows] = await Promise.all([
            await CateModel.countDocuments({ lock: lock.DISABLE }),
            await CateModel.find({ lock: lock.DISABLE }).skip(offset).limit(pagination.LIMIT),
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
    }
    catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Can not get category list'
        })
    }
}

export default {
    createCategory,
    deleteByCate,
    allCategory,
}