import OrderModel from './order.model.js'
import restoClient from '../../const/restoClient.js'
const checkstatus = async (req, res, next) => {//check client da dang nhap chua
    try {
        const { orderId, status } = req.body;
        const ordercheck = await OrderModel.findById(orderId);
        const statusnew = ordercheck.status + 1;
        if (statusnew == status && status<4) next();////////////////////loi, ko co else
        else return restoClient.resJson(res, {
            status: 500,
            msg: 'trang thai moi khong hop le'
        })
    }
    catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'loi db'
        })
    }
}
export default{
    checkstatus
  };