import React, { useState } from "react";
import { assets } from "../assets/assets";
import "./Add.css";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setsubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      console.log("Submitting FormData:", [...formData.entries()]); // ✅ Debugging output

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Corrected token format
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')

      } else{
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="formm">
    
    <div>
  <p className="uploadp">Upload Image</p>
  <div className="imageupload">
    {[image1, image2, image3, image4].map((image, index) => (
      <label key={index} htmlFor={`image${index + 1}`}>
        <img
          className="uploadimg"
          src={image ? URL.createObjectURL(image) : assets.upload_area} // ✅ Preview image
          alt=""
        />
        <input
          type="file"
          id={`image${index + 1}`}
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            // ✅ Correctly set the image in state
            if (index === 0) setImage1(file);
            if (index === 1) setImage2(file);
            if (index === 2) setImage3(file);
            if (index === 3) setImage4(file);
          }}
        />
      </label>
    ))}
  </div>
</div>


      <div className="products">
        <p className="productp">Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="Productname" type="text" placeholder="Type here" required />
      </div>

      <div className="products">
        <p className="productp">Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="Productname" placeholder="Write Content here" required />
      </div>

      <div className="category">
        <div>
          <p className="categoryp">Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="select" required>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="categoryp">Sub category</p>
          <select onChange={(e) => setsubCategory(e.target.value)} className="select">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        
        <div>
          <p className="pricep">Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="price" type="number" placeholder="25" required />
        </div>
      </div>

      <div>
        <p className="product-size-p">Product sizes</p>
        <div className="sizesection">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} onClick={() => setSizes((prev) => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? "sizee" : "sizes"} sizes`}>{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bestseller">
        <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className="bestseller-label" htmlFor="bestseller">Add to bestseller</label>
      </div>
      <br />

      <button className="submitbtn" type="submit">Submit</button>
    </form>
  );
};

export default Add;
