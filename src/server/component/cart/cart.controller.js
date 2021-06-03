import cartModel from './cart.model.js'
import {success} from '../response/success.js'
import statusCode from '../response/statusCode.js'

const updateCart = async (req, res, next) => {
    try {
        const {products} = req.body;
        const userId = req.user._id;
        await cartModel.updateOne({ userId }, { products });

        return success(res, {
            httpCode: statusCode.OK,
            message: 'product added to cart successfully',
            data: products
        })
    } catch (err) {
        next(err);
    }
}

const CartByUserId = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const cart = await cartModel.aggregate([
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
                    from: "products",//truy van toi collection nao
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

        return success(res, {
            httpCode: statusCode.OK,
            data: cart,
        })
    } catch (err) {
        next(err)
    }
}


export default {
    CartByUserId,
    updateCart
}