import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import "./list.css";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  // Fetch product list
  const fetchList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please log in again.");
        return;
      }

      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Product List:", response.data);
      setList(response.data.products);
    } catch (error) {
      console.error("Error fetching product list:", error.response?.data || error.message);
      setError("Failed to fetch products. Please try again.");
    }
  };

  // Remove product function
  const removeProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please log in again.");
        return;
      }

      const response = await axios.post(`${backendUrl}/api/product/remove`, {
        productId: productId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      

      console.log(`Product ${productId} removed successfully!`);

      // ✅ Update the state to remove the deleted product from the UI
      setList((prevList) => prevList.filter((item) => item._id !== productId));

    } catch (error) {
      console.error("Error removing product:", error.response?.data || error.message);
      setError("Failed to remove product. Please try again.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="productlistp">All Products List</p>
      {error && <p className="error">{error}</p>}
      <div className="productlist">

        {/* Product List Header */}
        <div className="pp">
          <div>Image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Action</div>
        </div>

        {/* Product List */}
        {list.length > 0 ? (
          list.map((item) => (
            <div key={item._id} className="pp">
              <div>
                <img className="imggg" src={item.image} alt={item.name} />
              </div>
              <div>{item.name}</div>
              <div>{item.category}</div>
              <div>{currency}{item.price}</div>
              <div>
                <button className="delete-btn" onClick={() => removeProduct(item._id)}>X</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products available.</p>
        )}

      </div>
    </>
  );
};

export default List;
