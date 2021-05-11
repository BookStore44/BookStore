import UserModel from './user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import status from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
import CartModel from '../cart/cart.model.js'
const signup = async (req, res) => {
    try {
        const user = await UserModel.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 2),
            role: status.role.USER,
        });
        await CartModel.create({
            userId: user._id,
        });
        restoClient.resJson(res, {
            status: 200,
            msg: 'tao tai khoan thanh cong',
        })
    } catch (err) {
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
        const staff = await UserModel.find({ role: status.role.staff });
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
const deleteByUsername = async (req, res) => {
    try {
        await UserModel.findOneAndUpdate({ username: req.body.username }, { lock: status.lock.ACTIVE })
        restoClient.resJson(res, {
            status: 200,
            msg: 'Xóa nguoi dung thành công',
        })
    } catch (err) {
        restoClient.resJson(res, {
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
        await UserModel.updateOne({ _id: req.data._id }, { avatar: imgPath });
        restoClient.resJson(res, {
            status: 500,
            msg: 'Da cap nhat ava'
        })
    } else {
        restoClient.resJson(res, {
            status: 500,
            msg: 'Không thể cập nhật avatar'
        })
    }
};
export {
    signup,
    signin,
    allStaff,
    deleteByUsername,
    updateAvatar,
};