import express from 'express';
import *as authModel from '../../middleware/auth.js';
//import *as CartMiddleware from './cart.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import *as CartController from './cart.controller.js'

const router = express.Router();

// router.post('/addCart',validate(checkReqCart), authModel.checkLogin, authModel.isStaffOrManager,CartMiddleware.isExistCartname, CartController.createCart)
router.get('/cartByUserId', authModel.checkLogin, authModel.isUser, CartController.CartByUserId)
router.put('/addtoCart', authModel.checkLogin, authModel.isUser, CartController.addtoCart)
// router.delete('/deleteCart',validate(checkReqCartName), authModel.checkLogin, authModel.isStaffOrManager, CartController.deleteByCartName)
// router.put("/image",upload.array("Cart", 10), CartController.uploadImage);
export default router;
