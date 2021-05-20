import CateModel from './category.model.js'
import ProductModel from '../product/product.model.js'
import { role, lock, status } from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
const createCategory = async (req, res) => {
    try {
        await CateModel.create({
            categoryname: req.body.categoryname,
        })
        return restoClient.resJson(res, {
            status: 200,
            msg: 'tao category thanh cong'
        })
    } catch (error) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'loi khi tao category'
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
                msg: 'khong ton tai category'
            })
        }
        return restoClient.resJson(res, {
            status: 200,
            msg: 'Xóa category thành công'
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Lỗi khi xóa category'
        })
    }
};
const allCategory = async (req, res) => {
    try {
        const cate = await CateModel.find({ lock: lock.DISABLE });
        //console.log(staff)
        return restoClient.resJson(res, {
            status: 200,
            data: cate,
        })
    }
    catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Không thể lấy danh sách category'
        })
    }
}

export default {
    createCategory,
    deleteByCate,
    allCategory,
}