import OrderModel from './order.model.js'
import CartModel from '../cart/cart.model.js'
import { role, lock, status } from '../../const/status.js'
import restoClient from '../../const/restoClient.js'
import NotifyModel from '../notify/notify.model.js'
import mongoose from 'mongoose';

const addtoOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction(); //start transaction
  try {
    const { products } = req.body;//chỗ này nếu không có {} thì nó sẽ nghĩ cái products nay chỉ là tên biến.có ngoặc thì nó mới hiểu là biến products trong model
    const userid = req.data._id;
    const opts = { session, new: true };
    const order = new OrderModel({ userId: userid, products: products, status: status.WAIT });
    // Promise.all(order.save(opts),
    //     CartModel.updateOne({ userId: userid }, { products: [] }),
    //     NotifyModel.create({ _id: order._id, }),
    //     opts);
    await order.save(opts);
    await CartModel.updateOne({ userId: userid }, { products: [] }, opts);
    const notify = new NotifyModel({ orderId: order._id });
    await notify.save(opts);
    await session.commitTransaction();
    return restoClient.resJson(res, {
      status: 200,
      msg: 'order created successfully'
    })
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    return restoClient.resJson(res, {
      status: 500,
      err: err
    })
  }
}

const updateStatus = async (req, res) => {
   
  try {
    const { orderId, status } = req.body;
     
    if (status == 3)
      await OrderModel.updateOne({ _id: orderId }, { status: status, dayfinish: Date.now() } );
    else if (status == 2)
      await OrderModel.updateOne({ _id: orderId }, { status: status, daydelivery: Date.now() } );
    else
      await OrderModel.updateOne({ _id: orderId }, { status: status } );
 
    restoClient.resJson(res, {
      status: 200,
      msg: "status changed",
    })
  } catch (err) {
     
    restoClient.resJson(res, {
      status: 500,
      msg: 'Can not get cart info',
    })
  }
}


export default{
  addtoOrder,
  updateStatus,
}



