import CateModel from './category.model.js'
import ProductModel from '../product/product.model.js'
import status from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
const createCategory = async (req, res) => {
    try {
        await CateModel.create({
            categoryname: req.body.categoryname,
        })
        restoClient.resJson(res, {
            status: 200,
            msg: 'tao category thanh cong'
        })
    } catch (error) {
        restoClient.resJson(res, {
            status: 500,
            msg: 'loi khi tao category'
        })
    }
}
const deleteByCate = async (req, res) => {
    try {
        await ProductModel.updateMany({ category: req.body.category }, { "$set": { lock: status.lock.ACTIVE } });
        const data = await CateModel.findOneAndUpdate({ _id: req.body.category }, { lock: status.lock.ACTIVE })
        if (data == null)
            return restoClient.resJson(res, {
                status: 500,
                msg: 'khong ton tai category'
            })

        restoClient.resJson(res, {
            status: 200,
            msg: 'Xóa category thành công'
        })
    } catch (err) {
        restoClient.resJson(res, {
            status: 500,
            msg: 'Lỗi khi xóa category'
        })
    }
};
const allCategory = async (req, res) => {
    try {
        const cate = await CateModel.find({ lock: status.lock.DISABLE });
        //console.log(staff)
        restoClient.resJson(res, {
            status: 200,
            data: cate,
        })
    }
    catch (err) {
        restoClient.resJson(res, {
            status: 500,
            msg: 'Không thể lấy danh sách category'
        })
    }
}

export {
    createCategory,
    deleteByCate,
    allCategory,
}