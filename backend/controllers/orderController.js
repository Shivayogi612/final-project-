import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

//  Initialize Razorpay
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  Initialize Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, 
  },
});

// Place Order - Cash on Delivery (COD)
const placeOrder = async (req, res) => {
  try {
    const { userId, items, address, email, amount } = req.body;

    if (!userId || !items || !address || !email || !amount) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      isPaid: false,
      date: Date.now(),
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "🎉 Order Confirmation - Forever Clothing",
      html:`<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    
    <!-- Brand Logo & Name -->
    <div style="text-align: center; padding-bottom: 10px;">
        <h1 style="color: #e74c3c; margin-bottom: 5px;">Forever Clothing</h1>
        <p style="font-size: 14px; color: #555;">Your fashion, your style!</p>
    </div>

    <!-- Greeting -->
    <h2 style="color: #2c3e50;">Dear ${address.firstName},</h2>
    <p style="font-size: 16px;">🎉 <strong>Great News! Your Order Has Been Successfully Placed.</strong> 🎉</p>
    
    <p>Thank you for shopping with us! We have received your order and will begin processing it shortly.</p>

    <!-- Order Details -->
    <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h3 style="color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 5px;">🛍️ Order Details:</h3>
        <ul style="list-style-type: none; padding: 0; line-height: 1.6;">
            <li><strong>📌 Order ID:</strong> ${newOrder._id}</li>
            <li><strong>💰 Total Amount:</strong> ₹${amount} <span style="color: #27ae60; font-weight: bold;">(25% Discount Applied!)</span></li>
            <li><strong>💳 Payment Method:</strong> Cash on Delivery (COD)</li>
            <li><strong>📅 Order Date & Time:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</li>
        </ul>
    </div>

    <!-- Next Steps -->
    <h3 style="color: #f39c12;">📦 What Happens Next?</h3>
    <ul style="padding-left: 20px; line-height: 1.6;">
        <li>✅ Our team will carefully pack your order.</li>
        <li>🚚 We will dispatch your order within <strong>1 to 2 business days.</strong></li>
        <li>💵 Payment will be collected upon delivery.</li>
    </ul>

    <!-- Customer Support -->
    <h3 style="color: #27ae60;">🔔 Need Assistance?</h3>
    <p>If you have any questions, feel free to reply to this email or 
        <a href="mailto:support@foreverclothing.com" style="color: #3498db; text-decoration: none;"><strong>contact our support team</strong></a>.
    </p>

    <p>We appreciate your trust in us and look forward to serving you again. 😊</p>

    <!-- Closing Message -->
    <p style="font-size: 18px; font-weight: bold; text-align: center; color: #e74c3c;">Best Regards,<br>Forever Clothing Team</p>

</div>
`
  };
  

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Order confirmation email sent:", info.response);
      }
    });

    res.json({ success: true, message: "Order Placed Successfully, Email Sent" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  Place Order - Razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address, email } = req.body;

    if (!userId || !items || !address || !amount || !email) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      isPaid: false,
      date: Date.now(),
    });

    await newOrder.save();

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: newOrder._id.toString(), 
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: "Something went wrong" });
      } else {
        return res.json({ success: true, order });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorPay = async (req, res) => {
  try {
      const { userId, razorpay_order_id, email } = req.body;

      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

      if (orderInfo.status === 'paid') {
          await orderModel.findOneAndUpdate({ _id: orderInfo.receipt }, { payment: true });
          await userModel.findByIdAndUpdate(userId, { cartData: {} });

          // Send email to the user
          const mailOptions = {
              from: process.env.EMAIL,
              to: email,  
              subject: "Order Confirmation - Payment Successful ✅",
              html:`<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    
    <div style="text-align: center; padding-bottom: 10px;">
        <h1 style="color: #e74c3c; margin-bottom: 5px;">Forever Clothing</h1>
        <p style="font-size: 14px; color: #555;">Your fashion, your style!</p>
    </div>

    <h2 style="color: #2c3e50;">Dear Customer,</h2>
    <p style="font-size: 16px;">🎉 <strong>We have successfully received your payment!</strong> 🎉</p>
    
    <p>Your order has been confirmed and is now being processed.</p>

    <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h3 style="color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 5px;">🛍️ Order Details:</h3>
        <ul style="list-style-type: none; padding: 0; line-height: 1.6;">
            <li><strong>📌 Order ID:</strong> ${orderInfo.receipt}</li>
            <li><strong>💰 Total Amount Paid:</strong> ₹${orderInfo.amount / 100}</li>
            <li><strong>💳 Payment Method:</strong> Razorpay</li>
            <li><strong>📅 Date & Time:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</li>
        </ul>
    </div>

    <h3 style="color: #f39c12;">📦 What Happens Next?</h3>
    <p>Your order is being prepared for shipment. You will receive tracking details once it is dispatched.</p>

    <h3 style="color: #27ae60;">🔔 Need Help?</h3>
    <p>If you have any questions or concerns about your order, feel free to reply to this email or 
        <a href="mailto:support@foreverclothing.com" style="color: #3498db; text-decoration: none;"><strong>contact our support team</strong></a>.
    </p>

    <p>Thank you for choosing us! We truly appreciate your business and look forward to serving you again. 😊</p>

    <p style="font-size: 18px; font-weight: bold; text-align: center; color: #e74c3c;">Best Regards,<br>Forever Clothing Team</p>

</div>
` 

          };

          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.log("Error sending email:", error);
              } else {
                  console.log("Email sent successfully:", info.response);
              }
          });

          res.json({ success: true, message: "Payment Successful, Order Placed, Email Sent" });
      } else {
          res.json({ success: false, message: "Payment Failed" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get All Orders (Admin Panel)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get User Orders (Frontend)
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Update Order Status (Admin)
const updateStatus = async (req, res) => {
  // Implement order status update logic
};

export { verifyRazorPay, placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus };
