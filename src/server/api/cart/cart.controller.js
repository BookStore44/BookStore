import CartModel from './cart.model.js'
import UserModel from '../user/user.model.js'
import { role, lock, status } from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
import mongoose from 'mongoose'
const addtoCart = async (req, res) => {
    try {
        const { _id, amount } = req.query;
        const userId = req.data._id;
        await CartModel.updateOne({ userId }, { $push: { products: { _id: userId, amount } } });//o day no da tu check xem la co product id nay khong, do trong model mình đã dùng ref

        return restoClient.resJson(res, {
            status: 200,
            msg: 'product added to cart successfully'
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            err: err
        })
    }
}
const updateCart = async (req, res) => {
    try {
        const {products} = req.body;
        const userId = req.data._id;
        await CartModel.updateOne({ userId }, { products });

        return restoClient.resJson(res, {
            status: 200,
            msg: 'product added to cart successfully'
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            err: err
        })
    }
}

const CartByUserId = async (req, res) => {
    try {
        const userId = req.data._id;
        const cart = await CartModel.aggregate([
            {
                $match: {//loc nhung document voi dieu kien cho trước
                    userId: userId
                },
            },

            {
                $unwind: "$products",//tach mang và tao ra cac doi tuong sao chep tu doi tuong dau
            },
            {
                $lookup: {//giong where bằng
                    from: "product",//truy van toi collection nao
                    localField: "products._id",//truong hien tai
                    foreignField: "_id",//truong lien ket tơi
                    as: "InfoProduct",
                },
            },
            {
                $unwind: "$InfoProduct",//tach mang và tao ra cac doi tuong sao chep tu doi tuong dau
            },
            {
                $match: {//loc nhung document voi dieu kien cho trước
                    'InfoProduct.lock': false,
                }, 
            }
        ]);
        //const cartlock= cart.lock=true;
        return restoClient.resJson(res, {
            status: 200,
            data: cart,
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Can not get cart information',
            err: err
        })
    }
}


export default {
    addtoCart,
    CartByUserId,
    updateCart
}