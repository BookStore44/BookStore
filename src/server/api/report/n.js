



const addCart = async (req, res) => {
    const { productName, amount, id } = req.body;
    const email = req.user.email;
  
    const session = await mongoose.startSession();
    session.startTransaction(); //start transaction
    const opts = { session, new: true };
    const products = await product.findOne({ name: productName });
    const carts = await cart.findOne({ userId: email });
    if (!carts) {
      res.json({ message: "no" })
    }
    const total = carts.total + products.price * amount;
  
    let arrProduct = [];
  
    try {
      if (carts.product) {
        arrProduct = [...carts.product];
        const checkIncludes = arrProduct.includes(id);
        if (checkIncludes == true) {
          const updateCart = arrProduct.map((x) => {
            if (x.product.name == productName) {
              x.product.amount + amount;
            }
          });
  
          await cart.findOneAndUpdate(
            { id: email },
            { total: total, product: updateCart },
            opts
          );
          res.status(200).json({ Cart: arrProduct, Total: total });
        }
  
        arrProduct.push({
          id: id,
          name: productName,
          amount: amount,
          price: products.price,
        });
        res.json({ id: arrProduct })
        await cart.findOneAndUpdate(
          { id: email },
          { total: total, product: arrProduct },
          opts
        );
        res.status(200).json({ Cart: arrProduct, Total: total });
      } else {
        arrProduct.push({
          id: id,
          name: productName,
          amount: amount,
          price: products.price,
        });
        await cart.findOneAndUpdate(
          { id: email },
          {
            total: total,
            product: {
              id: id,
              name: productName,
              amount: amount,
              price: products.price,
            },
          },
          opts
        );
        await session.commitTransaction();
        res.status(200).json({ Cart: arrProduct, Total: total });
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ Error: error });
    }
  };
  
  
  
  const createOrder = async (req, res, next) => {
    const { email, _id } = req.user;
    const { products, address, phone } = req.body;
    const session = await mongoose.startSession();
    const carts = await cart.findOne({ userId: _id }).populate('product.id');
    if (carts.product == null) {
      res.status(400).json({ Message: "Cart is Empty" });
    } else {
      try {
        session.startTransaction(); //start transaction
        const opts = { session, new: true };
        const productOrder = carts.product;
        console.log(typeof productOrder);
        let total = 0;
        productOrder.map((value) => { total += value.amount * value.id.price });
        console.log(total)
        const orders = new order({
          id: _id,
          products,
          phone,
          address,
          status: statusMiddleWare.orderStatus.WAITING,
          total
        })
        const notifications = new notification({
          title: "New Order",
          content: orders,
          Date: Date.now()
        })
        Promise.all(notifications.save(opts), orders.save(opts), cart.findOneAndUpdate({ userId: _id }, { product: [] }), opts);
        await session.commitTransaction();
        res.status(200).json({ Message: "Create order successful" });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ Error: error });
      }
    }
  };
  
  const update = async (req, res) => {
    const { product, toDay, fromDay } = req.body;
    const report = await order.aggregate([
      {
        $match: {
          finishDay: { $gte: new Date(fromDay), $lte: new Date(toDay) },
          //"products":{$exists:{productId:_id}}
  
        },
      },
      {
        $lookup: {//giong where bằng
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productArr",
        },
      },
      {
        $unwind: "$products",//lay ra khỏi mảng(bỏ mảng)
        //[{$unwind: "$products"}.productId]
      },
  
      {
        $group: {//group by
          _id: "$products.productId",
          amount: { $sum: "$products.amount" },
          revenue: {
            $sum: { $multiply: ["$products.price", "$products.amount"] },
          },
          //product: { $push: "$products" },
          name: { $push: "$productArr.name" },
          price: { $push: "$productArr.price" },
  
  
        },
      },
      // {
      //   $match: {
      //     //finishDay: { $gte: new Date(fromDay), $lte: new Date(toDay) },
      //     //"$product.productId":_id
      //     //"_id":product,
      //     _id:product
  
      //   },
      // },
      {
        $project: {
          _id: "$_id",
          products: "$products[0].productId",
          name: "$name",
          price: "$price",
          amount: "$amount",
          revenue: "$revenue",
  
        },
      },
    ]);
  }
  
  const update2 = async (req, res) => {
    const { _id: product, toDay, fromDay } = req.body;
    const report = await order.aggregate([
      {
        $match: {//loc nhung document voi dieu kien cho trước
          finishDay: { $gte: new Date(fromDay), $lte: new Date(toDay) },
        },
      },
  
      {
        $unwind: "$products",
      },
  
      {
        $group: {
          _id: "$products.productId",
          amount: { $sum: "$products.amount" },
          revenue: {
            $sum: { $multiply: ["$products.price", "$products.amount"] },
          },
          // price: { $push: "$products.price" },
        },
      },
      // {
      //   $lookup: {
      //     from: "products",
      //     localField: "productId",
      //     foreignField: "_id",
      //     as: "product",
      //   },
      // },
      {
        $project: {//Chỉ định lấy các field cần thiết
          productId: "$_id",
          //name:"$product",
          amount: "$amount",
          revenue: "$revenue",
          //price: "$price",
        },
      },
      {
        $lookup: {//giong where bằng
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productArr",
        },
      },
    ]);
  }