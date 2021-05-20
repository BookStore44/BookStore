import UserModel from './user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { role, lock, status } from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
import CartModel from '../cart/cart.model.js'
import mongoose from 'mongoose'
const limit = 2;
const signup = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const opts = { session, new: true };
        const user = await UserModel.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 2),
            role: role.USER,
        }, opts);
        await CartModel.create({
            userId: user._id,
        }, opts);
        await session.commitTransaction();
        restoClient.resJson(res, {
            status: 200,
            msg: 'tao tai khoan thanh cong',
        })
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        restoClient.resJson(res, {
            status: 200,
            err: err,
            msg: 'loi khi tao tai khoan',
        })
    }
}
const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await UserModel.findOne({
            username,
        })
        if (data) {
            var passwordIsValid = bcrypt.compareSync(
                password,
                data.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Sai Password!"
                });
            }
            const payload = { _id: data._id, username: data.username, role: data.role };///////////////id user
            const token = jwt.sign(payload, 'matkhau')
            req.headers.authorization = token;
            //setCookie('token', data.token, 0.01)
            return restoClient.resJson(res, {
                status: 500,
                msg: 'thanh cong',
                token: token
            })
        }
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Khong ton tai username',
        })
    }
    catch (err) {
        restoClient.resJson(res, {
            status: 500,
            err: err,
        })
    }
}

const allStaff = async (req, res) => {
    try {
        const staff = await UserModel.find({ role: role.staff });
        //console.log(staff)
        restoClient.resJson(res, {
            status: 200,
            data: staff,
            msg: 'thanh cong'
        })
    } catch (err) {
        restoClient.resJson(res, {
            status: 500,
            err: err,
        })
    }
}

const allUser = async (req, res) => {
    try {
        const page = +req.query.page || 0;
        if (page < 0) page = 1;
        const offset = page * limit;
        const [total, rows] = await Promise.all([
            await UserModel.countDocuments(),
            await UserModel.find().skip(offset).limit(limit),
        ]);
        const nPages = Math.ceil(total / limit);
        if (page > nPages)
            return restoClient.resJson(res, {
                status: 500,
                msg: 'trang khong ton tai'
            })
        //console.log(staff)
        restoClient.resJson(res, {
            status: 200,
            data: rows,
            msg: 'thanh cong'
        })
    } catch (err) {
        restoClient.resJson(res, {
            status: 500,
            err: err,
        })
    }
}


const deleteByUsername = async (req, res) => {
    try {
        const username = req.body.username;
        await UserModel.findOneAndUpdate({ username }, { lock: status.lock.ACTIVE })
        return restoClient.resJson(res, {
            status: 200,
            msg: 'Xóa nguoi dung thành công',
        })
    } catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            err: err,
            msg: 'loi khi xoa nguoi dung'
        })
    }
};
const updateAvatar = async (req, res) => {
    if (req.file) {
        const imgPath = 'public/images/' + req.file.filename;
        //await UserModel.updateOne({ _id: req.data._id }, { avatar: req.file.filename });
        const userid = req.data._id;
        await UserModel.updateOne({ _id: userid }, { avatar: imgPath });
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Da cap nhat ava'
        })
    } else {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'Không thể cập nhật avatar'
        })
    }
};
export default {
    signup,
    signin,
    allStaff,
    deleteByUsername,
    updateAvatar,
    allUser
};