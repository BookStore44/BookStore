import express from 'express';
import authModel from '../../middleware/auth.js';
//import CartMiddleware from './cart.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import CartController from './cart.controller.js'

const router = express.Router();

// router.post('/addCart',validate(checkReqCart), authModel.checkLogin, authModel.isStaffOrManager,CartMiddleware.isExistCartname, CartController.createCart)
router.get('/cartByUserId', authModel.checkLogin, authModel.isUser, CartController.CartByUserId)
router.put('/addtoCart', authModel.checkLogin, authModel.isUser, CartController.addtoCart)//ham nay thuc chat khong su dung
router.put('/updateCart', authModel.checkLogin, authModel.isUser, CartController.updateCart)
// router.delete('/deleteCart',validate(checkReqCartName), authModel.checkLogin, authModel.isStaffOrManager, CartController.deleteByCartName)
// router.put("/image",upload.array("Cart", 10), CartController.uploadImage);
export default router;

