import express from 'express';
import authModel from '../../middleware/auth.js';
import userMiddleware from './user.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import userController from './user.controller.js'
import {loginValidation, checkReqUsername} from './user.validate.js'
import multer from 'multer';
import {upload} from '../../const/saveImage.js'
const router = express.Router();

router.post('/signup',  userMiddleware.isExistUsername, userController.signup)
router.post('/signin', userController.signin)
router.get('/allStaff', authModel.checkLogin, authModel.isManager, userController.allStaff)
router.get('/allUser', userController.allUser)
router.delete('/deleteStaff', validate(checkReqUsername), authModel.checkLogin, authModel.isManager, userController.deleteByUsername)
router.put('/avatar', authModel.checkLogin ,upload.single('avatar'), userController.updateAvatar);
export default router;

