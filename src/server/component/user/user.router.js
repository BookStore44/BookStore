import express from 'express';
import authController from '../auth/auth.controller.js';
import userMiddleware from './user.middleware.js'
import { validate} from 'express-validation'
import userController from './user.controller.js'
import {checkReqId, checkReqUser, checkReqUsername} from './user.validate.js'
import multer from 'multer';
import {upload} from '../../const/saveImage.js'
const router = express.Router();

router.post('/signup', validate(checkReqUser), userMiddleware.isExistUsername, userController.signUp)
router.post('/signin', validate(checkReqUser) ,userController.signIn)

router.get('/allStaff', authController.checkLogin, authController.isManager, userController.getListStaff)
router.delete('/deleteStaff', validate(checkReqId), userController.deleteUserById);
//, authController.checkLogin, authController.isManager, 
router.put('/avatar', authController.checkLogin ,upload.single('avatar'), userController.updateAvatar);
router.get('/getUserById', userController.getUserById);
router.put('/updateUsertoStaff', userController.updateUserToStaff)
export default router;

