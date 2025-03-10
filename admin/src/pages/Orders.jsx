import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch Orders Function
  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("User not authenticated!");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {}, // Empty body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API Response:", response.data); // ✅ Debugging

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
      toast.error("Failed to fetch orders!");
    }
  };

  // ✅ Fetch orders when component mounts or token changes
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h2>Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <strong>Order ID:</strong> {order.id} <br />
              <strong>Name:</strong> {order.name || "N/A"} <br />
              <strong>Status:</strong> {order.status || "Pending"} <br />
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default Orders;
