import express from 'express';
import authModel from '../../middleware/auth.js';
//import CartMiddleware from './cart.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import ReportController from './report.controller.js'
import OrderMiddleware from './order.middleware.js'
const router = express.Router();
router.post('/addtoOrder', authModel.checkLogin, authModel.isUser, OrderController.addtoOrder)
router.put('/updateStatus', authModel.checkLogin, authModel.isStaffOrManager,OrderMiddleware.checkstatus, OrderController.updateStatus)
export default router;
