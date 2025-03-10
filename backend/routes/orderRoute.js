import express from "express";
import { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyRazorPay } from '../controllers/orderController.js'
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router()

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
orderRouter.post('/user', authUser, userOrders)

orderRouter.post('/verifyRazorpay', authUser, verifyRazorPay)

export default orderRouter