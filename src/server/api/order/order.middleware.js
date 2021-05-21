import OrderModel from './order.model.js'
import restoClient from '../../const/restoClient.js'
const checkstatus = async (req, res, next) => {//check client da dang nhap chua
    try {
        const { orderId, status } = req.body;
        const ordercheck = await OrderModel.findById(orderId);
        const statusnew = ordercheck.status + 1;
        if (statusnew == status && status<4) next();////////////////////loi, ko co else
        else return restoClient.resJson(res, {
            status: 403,
            msg: 'new status is not valid'
        })
    }
    catch (err) {
        return restoClient.resJson(res, {
            status: 500,
            msg: 'error database'
        })
    }
}
export default{
    checkstatus
  };