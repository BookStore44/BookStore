import express from 'express';
import authController from '../auth/auth.controller.js';
//import CartMiddleware from './cart.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import orderController from './order.controller.js'
import orderMiddleware from './order.middleware.js'
const router = express.Router();
router.post('/createOrder', authController.checkLogin, authController.isUser, orderController.createOrder)
router.put('/updateStatus', authController.checkLogin, authController.isStaffOrManager,orderMiddleware.checkStatus, orderController.updateStatus)
export default router;
