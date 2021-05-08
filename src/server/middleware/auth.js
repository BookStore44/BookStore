import UserModel from '../api/user/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import status from '../const/status.js'
const checkLogin = async (req, res, next) => { //kiem tra tai khoan nay da dang nhap hay chua
    try {
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
        const data = jwt.verify(token, 'matkhau');
        //console.log(data.username)
        await UserModel.findOne({ username: data.username })
            .then(data => {
                if (data) {
                    req.data = data;
                    // console.log(data);
                    // console.log(typeof (req.body.password));
                    // console.log(typeof (data.password));
                    // const passwordIsValid = bcrypt.compareSync(
                    //     req.body.password,
                    //     data.password
                    // );

                    // console.log(passwordIsValid);
                    // if (!passwordIsValid) {
                    //     return res.status(401).send({
                    //         accessToken: null,
                    //         message: "Invalid Password!"
                    //     });
                    // }

                    next();
                }
                else res.json('ban chua dang nhap');
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({loi:"loi database"})
            })

    } catch (err) {
        console.log(err);
        res.status(500).json('token khong hop le');
    }
}
const isManager = (req, res, next) => {
    if (req.data.role === status.role.manager) next()
    else
        res.json('khong du quyen')
}
const isStaffOrManager= (req, res, next) => {
    if (req.data.role === status.role.staff||req.data.role === status.role.manager) next()
    else
        res.json('khong du quyen')
}
export {
    checkLogin,
    isManager,
    isStaffOrManager,
}