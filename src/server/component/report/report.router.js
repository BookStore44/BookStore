import express from 'express';
import authController from '../auth/auth.controller.js';
//import CartMiddleware from './cart.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import reportController from './report.controller.js'
//import ReportMiddleware from './report.middleware.js'
const router = express.Router();
router.put('/reportByProduct', authController.checkLogin, authController.isStaffOrManager, reportController.reportByProduct)
router.put('/reportByCategory', authController.checkLogin, authController.isStaffOrManager, reportController.reportByCategory)
//router.put('/updateStatus', authController.checkLogin, authController.isStaffOrManager,OrderMiddleware.checkstatus, OrderController.updateStatus)
export default router;
