import express from 'express';
import authController from '../auth/auth.controller.js';
import notifyController from './notify.controller.js'
const router = express.Router();
router.get('/getListNotify/:page', authController.checkLogin, authController.isStaffOrManager, notifyController.getListNotify)
router.get('/getNotifyById', authController.checkLogin,authController.isStaffOrManager, notifyController.getNotifyById)

export default router;
