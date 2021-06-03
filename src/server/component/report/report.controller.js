import express from 'express';

//import CartMiddleware from './cart.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import { } from '../order/order.model.js'
import productModel from '../product/product.model.js'
import orderModel from '../order/order.model.js'
import {success} from '../response/success.js'
import {myError} from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import {errorList} from '../response/errorList.js'
const reportByProduct = async (req, res, next) => {
  const { fromDay, toDay } = req.body;
  const report = await orderModel.aggregate([
    {
      $match: {//loc nhung document voi dieu kien cho trước
        dayFinish: { $gte: new Date(fromDay), $lte: new Date(toDay) },
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
        from: "products",//truy van toi collection nao
        localField: "productId",//truong hien tai
        foreignField: "_id",//truong lien ket tơi
        as: "InfoProduct",
      },
    },
  ]);
  return success(res, {
    httpCode: statusCode.OK,
    data: report,
  })
}

const reportByCategory = async (req, res, next) => {
  const { fromDay, toDay } = req.body;
  const report = await orderModel.aggregate([
    {
      $match: {//loc nhung document voi dieu kien cho trước
        dayFinish: { $gte: new Date(fromDay), $lte: new Date(toDay) },
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
        from: "categories",//truy van toi collection nao
        localField: "categoryId",//truong hien tai
        foreignField: "_id",//truong lien ket tơi
        as: "InfoCategory",
      }
    },
    

  ]);
  return success(res, {
    httpCode: statusCode.OK,
    data: report,
  })
}
export default{
  reportByProduct,
  reportByCategory
}