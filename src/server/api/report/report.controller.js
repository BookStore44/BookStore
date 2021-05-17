import express from 'express';
import authModel from '../../middleware/auth.js';
//import CartMiddleware from './cart.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import { } from '../order/order.model.js'
import ProductModel from '../product/product.model.js'
import OrderModel from '../order/order.model.js'
import restoClient from '../../const/restoClient.js'
const reportbyProduct = async (req, res) => {
  const { fromDay, toDay } = req.body;
  const report = await OrderModel.aggregate([
    {
      $match: {//loc nhung document voi dieu kien cho trước
        dayfinish: { $gte: new Date(fromDay), $lte: new Date(toDay) },
      },
    },

    {
      $unwind: "$products",//tach mang và tao ra cac doi tuong sao chep tu doi tuong dau
    },
    {
      $group: {
        _id: "$products.productId",
        amount: { $sum: "$products.amount" },
        revenue: {
          $sum: { $multiply: ["$products.price", "$products.amount"] },
        },
      },
    },
    {
      $project: {
        productId: "$_id",
        amount: "$amount",
        revenue: "$revenue",
      },
    },
    {
      $lookup: {//giong where bằng
        from: "product",//truy van toi collection nao
        localField: "productId",//truong hien tai
        foreignField: "_id",//truong lien ket tơi
        as: "InfoProduct",
      },
    },
  ]);
  return restoClient.resJson(res, {
    status: 200,
    data: report,
  })
}

const reportbyCategory = async (req, res) => {
  const { fromDay, toDay } = req.body;
  const report = await OrderModel.aggregate([
    {
      $match: {//loc nhung document voi dieu kien cho trước
        dayfinish: { $gte: new Date(fromDay), $lte: new Date(toDay) },
      },
    },
    {
      $unwind: "$products",//tach mang và tao ra cac doi tuong sao chep tu doi tuong dau
    },
    {
      $lookup: {//giong where bằng
        from: "product",//truy van toi collection nao
        localField: "products.productId",//truong hien tai
        foreignField: "_id",//truong lien ket tơi
        as: "InfoProduct",
      }
    },
    {
      $unwind: "$InfoProduct",//tach mang và tao ra cac doi tuong sao chep tu doi tuong dau
    },
    {
      $group: {
        _id: "$InfoProduct.category",
        amount: { $sum: "$products.amount" },
        revenue: {
          $sum: { $multiply: ["$products.price", "$products.amount"] },
        },
      },
    },
    {
      $project: {
        categoryId: "$_id",
        amount: "$amount",
        revenue: "$revenue",
      },
    },
    {
      $lookup: {//giong where bằng
        from: "category",//truy van toi collection nao
        localField: "categoryId",//truong hien tai
        foreignField: "_id",//truong lien ket tơi
        as: "InfoCategory",
      }
    },
    

  ]);
  return restoClient.resJson(res, {
    status: 200,
    data: report,
  })
}
export default{
  reportbyProduct,
  reportbyCategory
}