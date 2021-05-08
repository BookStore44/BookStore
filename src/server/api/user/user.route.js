import express from 'express';
import *as authModel from '../../middleware/auth.js';
import *as userMiddleware from './user.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import *as userController from './user.controller.js'
import multer from 'multer';
const router = express.Router();
const upload = multer({ dest: 'public/images/' });
router.post('/signup', validate(userMiddleware.loginValidation), userMiddleware.isExistUsername, userController.signup)
router.post('/signin', userController.signin)
router.get('/allStaff', authModel.checkLogin, authModel.isManager, userController.allStaff)
router.delete('/deleteStaff', authModel.checkLogin, authModel.isManager, userController.deleteByUsername)
router.put('/avatar', authModel.checkLogin ,upload.single('avatar'), userController.updateAvatar);
export default router;

