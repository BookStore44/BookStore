import express from 'express';
import authModel from '../../middleware/auth.js';
//import CartMiddleware from './cart.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import NotifyController from './notify.controller.js'
const router = express.Router();
router.get('/getallNotify', authModel.checkLogin, authModel.isStaffOrManager, NotifyController.getallNotify)
router.get('/getNotifyById', authModel.checkLogin,authModel.isStaffOrManager, NotifyController.getNotifyById)
//router.put('/updateStatus', authModel.checkLogin, authModel.isStaffOrManager, OrderController.updateStatus)
export default router;
