import CartModel from './cart.model.js'
import UserModel from '../user/user.model.js'
import status from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
const addtoCart = async (req, res) => {
    console.log(req.query.product);
    console.log(req.query.number);
    try {
        await CartModel.findOne({userId: req.data._id})
        await CartModel.updateOne({ userId: req.data._id }, { $push: {product:{_id: req.query.product, Number: req.query.number}} });
        
        restoClient.resJson(res, {
            status: 200,
            msg: 'them product vao cart thanh cong'
        })
    } catch (err) {
        restoClient.resJson(res, {
            status: 500,
            err: err
        })
    }
}

const CartByUserId = async (req, res) => {
    try {
        const cart = await CartModel.find({ userId: req.data._id }).populate('user').exec();//req.data._id chinh la id cua nguoi dung dang dang nhap
        restoClient.resJson(res, {
            status: 200,
            data: cart,
        })
    } catch (err) {
        restoClient.resJson(res, {
            status: 500,
            msg: 'Không thể lấy thong tin gio hang',
        })
    }
}


export {
    addtoCart,
    CartByUserId,
}