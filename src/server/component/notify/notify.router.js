import express from 'express';
import authController from '../auth/auth.controller.js';
//import CartMiddleware from './cart.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import notifyController from './notify.controller.js'
const router = express.Router();
router.get('/getAllNotify', authController.checkLogin, authController.isStaffOrManager, notifyController.getAllNotify)
router.get('/getNotifyById', authController.checkLogin,authController.isStaffOrManager, notifyController.getNotifyById)
//router.put('/updateStatus', authController.checkLogin, authController.isStaffOrManager, OrderController.updateStatus)
export default router;
