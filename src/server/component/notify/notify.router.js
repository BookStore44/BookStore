import express from 'express';
import authController from '../auth/auth.controller.js';
import notifyController from './notify.controller.js'
const router = express.Router();
router.get('/getAllNotify', authController.checkLogin, authController.isStaffOrManager, notifyController.getAllNotify)
router.get('/getNotifyById', authController.checkLogin,authController.isStaffOrManager, notifyController.getNotifyById)

export default router;
