import userModel from './user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { role, lock} from '../../const/status.js'
import { success } from '../response/success.js'
import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
import cartModel from '../cart/cart.model.js'
import {userService} from './user.service.js'
import mongoose from 'mongoose'
const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        const { username, password } = req.body;
        session.startTransaction();
        const opts = { session, new: true };
        const user = new userModel({
            username,
            password: bcrypt.hashSync(password, 2),
            role: role.USER,
        });
        const cart = new cartModel({
            userId: user._id,
        });
        Promise.all([user.save(opts), cart.save(opts)], opts);
        await session.commitTransaction();
        return success(res, {
            httpCode: statusCode.CREATED,
            message: 'Account successfully created',
            data: username
        })
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
}
const signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const data = await userModel.findOne({ username });
        if (data) {
            var passwordIsValid = bcrypt.compareSync(
                password,
                data.password
            );
            if (!passwordIsValid) {
                return res.status(400).send({
                    accessToken: null,
                    message: "Wrong Password!"
                });
            }
            const payload = { _id: data._id, username: data.username, role: data.role };///////////////id user
            const token = jwt.sign(payload, process.env.SECRETKEY)
            req.headers.authorization = token;
            //setCookie('token', data.token, 0.01)
            return success(res, {
                httpCode: statusCode.OK,
                message: 'success',
                token: token
            })
        }
        else {
            throw new myError({
                name: 'Username does not exist',
                httpCode: statusCode.NOT_FOUND,
                description: errorList.FIND_ERROR,
            });
        }
    }
    catch (err) {
        next(err)
    }
}

const getListStaff = async (req, res, next) => {
    try {
        const page = +req.params.page || 0;
        const staff = await userService.getList({ page, condition: { role: role.STAFF } });
        success(res, {
            httpCode: statusCode.OK,
            data: staff,
            message: 'success'
        })
    } catch (err) {
        next(err)
    }
}
const getUserById = async (req, res, next) => {
    try {
        const {_id}=req.query;
        const user = await userModel.findById(_id);
        success(res, {
            httpCode: statusCode.OK,
            data: user,
            message: 'success'
        })
    } catch (err) {
        next(err)
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const {_id} = req.body;
        const user = await userModel.findOneAndUpdate({ _id }, { lock: lock.ACTIVE })
        if (user) {
            return success(res, {
                httpCode: statusCode.OK,
                message: 'Delete user successfully',
                data: user
            })
        }
        else {
            throw new myError({
                name: 'Username does not exist',
                httpCode: statusCode.NOT_FOUND,
                description: errorList.FIND_ERROR,
            });
        }
    } catch (err) {
        next(err)
    }
};
const updateAvatar = async (req, res, next) => {
    try {
        if (req.file) {
            const imgPath = 'public/images/' + req.file.filename;
            const userId = req.user._id;
            await userModel.updateOne({ _id: userId }, { avatar: imgPath });
            return success(res, {
                httpCode: statusCode.OK,
                message: 'Updated ava'
            })
        } else {
            throw new myError({
                name: req.file,
                httpCode: statusCode.NOT_FOUND,
                description: errorList.FIND_ERROR,
            });
        }
    }
    catch (err) {
        next(err)
    }
};
const updateUserToStaff= async (req, res, next) => {
    try {
        const {_id}=req.query;
        await userModel.updateOne({_id, role:role.USER}, {role: role.STAFF});
        success(res, {
            httpCode: statusCode.OK,
            data: {_id, role:1},
            message: 'success'
        })
    } catch (err) {
        next(err)
    }
}
export default {
    signUp,
    signIn,
    getListStaff,
    deleteUserById,
    updateAvatar,
    getUserById,
    updateUserToStaff
};