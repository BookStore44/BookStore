import express from 'express';
import authController from '../auth/auth.controller.js';
//import CartMiddleware from './cart.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import cartController from './cart.controller.js'
import CartMiddleware from './cart.middleware.js'

const router = express.Router();

// router.post('/addCart',validate(checkReqCart), authController.checkLogin, authController.isStaffOrManager,CartMiddleware.isExistCartname, cartController.createCart)
router.get('/cartByUserId', authController.checkLogin, authController.isUser, cartController.CartByUserId)
// router.put('/addtoCart', authController.checkLogin, authController.isUser, cartController.addtoCart)//ham nay thuc chat khong su dung
router.put('/updateCart', authController.checkLogin, authController.isUser, CartMiddleware.checkExistProductId ,cartController.updateCart)
// router.delete('/deleteCart',validate(checkReqCartName), authController.checkLogin, authController.isStaffOrManager, cartController.deleteByCartName)
// router.put("/image",upload.array("Cart", 10), cartController.uploadImage);
export default router;

