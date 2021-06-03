import orderModel from './order.model.js'
import cartModel from '../cart/cart.model.js'
import { status } from '../../const/status.js'
import { success } from '../response/success.js'
import notifyModel from '../notify/notify.model.js'
import { myError } from '../response/myError.js'
import statusCode from '../response/statusCode.js'
import { errorList } from '../response/errorList.js'
import mongoose from 'mongoose';

const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction(); //start transaction
  try {
    const { products } = req.body;//chỗ này nếu không có {} thì nó sẽ nghĩ cái products nay chỉ là tên biến.có ngoặc thì nó mới hiểu là biến products trong model
    const userId = req.user._id;
    const opts = { session, new: true };
    const order = new orderModel({ userId, products: products, status: status.WAIT });
    await order.save(opts);
    const notify= new notifyModel({ orderId: order._id });
    await notify.save(opts);
    //Promise.all([order.save(opts), notify.save(opts)], opts);
    await cartModel.updateOne({ userId}, { products: [] }, opts);
    await session.commitTransaction();
    return success(res, {
      httpCode: statusCode.CREATED,
      message: 'order created successfully',
      data: order
    })
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err)
  }
}

const updateStatus = async (req, res, next) => {

  try {
    const { orderId, status } = req.body;
    var order;//ko dùng const dc vì bị giới hạn scope
    if (status == 3)
      order = await orderModel.updateOne({ _id: orderId }, { status: status, dayFinish: Date.now() });
    else if (status == 2)
      order = await orderModel.updateOne({ _id: orderId }, { status: status, dayDelivery: Date.now() });
    else
      order = await orderModel.updateOne({ _id: orderId }, { status: status });
    success(res, {
      httpCode: statusCode.OK,
      message: "status changed",
      data: {orderId, status}
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createOrder,
  updateStatus,
}



