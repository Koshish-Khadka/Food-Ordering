import axios from "axios";
import Order from "../../models/orderModel.js";
import User from "../../models/userModel.js";

// this function initiate khalti payment process
export const initiateKhaltiPayment = async (req, res) => {
  const { orderId, amount } = req.body;

  if (!orderId || !amount) {
    return res
      .status(400)
      .json({ message: "Order ID and amount are required." });
  }
  let order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({
      message: "Order not Found with that id",
    });
  }
  // check the coming amount is the totalAmount of order
  if (order.totalAmount !== amount) {
    return res.status(400).json({
      message: "Amount must be equal to totalAmount",
    });
  }
  const data = {
    return_url: "http://localhost:5173/success",
    purchase_order_id: orderId,
    amount: amount * 1000, //paisa ma lagako
    website_url: "http://localhost:3000",
    purchase_order_name: "OrderName" + orderId,
  };
  const response = await axios.post(
    "https://dev.khalti.com/api/v2/epayment/initiate/",
    data,
    {
      headers: {
        Authorization: "key 8bf5eca167004ce9b59290bbf496369a",
      },
    }
  );

  //

  order.paymentDetails.pidx = response.data.pidx;
  await order.save();

  //   add the pidx to the order database
  // console.log(response.data);
  res.status(200).json({
    message: "Payment successfull",
    paymentUrl: response.data.payment_url,
  });
};

// This function verify khalti payment
export const verifyKhaltiPayment = async (req, res) => {
  console.log("Verify khalti payment is running");
  const userId = req.user.id;
  // query params bata lenu paryo like from:
  //http://localhost:3000/?pidx=tNwtLJebHHXnnMNAPLfKoV&transaction_id=bjXoJ2jNZNQy8BFYzSmQgZ&tidx=bjXoJ2jNZNQy8BFYzSmQgZ&txnId=bjXoJ2jNZNQy8BFYzSmQgZ&amount=1000&total_amount=1000&mobile=98XXXXX002&status=Completed&purchase_order_id=123&purchase_order_name=OrderName123
  // from this we need pidx so,
  const pidx = req.body.pidx;
  //   now hit the api to verify
  const response = await axios.post(
    "https://dev.khalti.com/api/v2/epayment/lookup/",
    { pidx: pidx },
    {
      headers: {
        Authorization: "key 8bf5eca167004ce9b59290bbf496369a",
      },
    }
  );
  console.log("verify response", response);
  if (response.data.status === "Completed") {
    // make changes to the database
    const order = await Order.find({ "paymentDetails.pidx": pidx });
    // update the order
    order[0].paymentDetails.method = "Khalti";
    order[0].paymentDetails.status = "paid";
    await order[0].save();

    // After successfull payment empty the cart of user
    const user = await User.findById(userId);
    user.cart = [];
    await user.save();
    res.status(200).json({
      message: "Payment Verified Successfully",
    });
    // notify the user via socket.io
  } else {
    res.redirect("http://localhost:3000/payment/failure");
  }
};
