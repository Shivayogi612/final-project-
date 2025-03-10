import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopcontext";
import "./product.css";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="productcard">
      {/* Product Data */}
      <div className="Productdata">
        <div className="Productimg">
          <div className="Productimg1">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="Productimg2"
                alt=""
              />
            ))}
          </div>

          <div className="Productimage3">
            <img className="Productimage4" src={image} alt="" />
          </div>
        </div>

        {/* ------------ Product Details ------------------- */}
        <div className="Productinfo">
          <h1 className="Productinfoh1">{productData.name}</h1>
          <div className="Productinfo1">
            <img className="Productinfoimg" src={assets.star_icon} alt="" />
            <img className="Productinfoimg" src={assets.star_icon} alt="" />
            <img className="Productinfoimg" src={assets.star_icon} alt="" />
            <img className="Productinfoimg" src={assets.star_icon} alt="" />
            <img className="Productinfoimg" src={assets.star_dull_icon} alt="" />
            <p className="Productinfop1">(102)</p>
          </div>

          {/* ----------- Updated Price with Discount ----------- */}
          <div className="ProductPriceSection">
            <p className="OriginalPrice">
              <s>{currency}  {productData.price}</s>
            </p>
            <p className="DiscountedPrice">
              {currency}  {(productData.price * 0.75).toFixed(2)}
            </p>
            <span className="DiscountTag">25% OFF</span>
          </div>

          <p className="Productdiscription">{productData.description}</p>
          <div className="Productdiscription1">
            <p>Select Size</p>
            <div className="Selectsize">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`size-box ${item === size ? "selected" : ""}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="addtocart"
          >
            ADD TO CART
          </button>
          <hr className="hr1" />
        </div>
      </div>

      {/* ---------------------- Description & Review Section ----------------------- */}
      <div className="Review">
        <h2 className="Reviewb1"></h2>
        <div className="discription">
          <p>
            🛍️ Our premium products are designed to offer you the best in
            quality, comfort, and style. Whether it's fashion, accessories, or
            everyday essentials, we bring you handpicked selections to elevate
            your lifestyle. ✨
          </p>
          <p>
            🚚 <strong>7-Day Return Policy:</strong> Shop with confidence! If
            you’re not 100% satisfied, you can return your purchase within 7
            days. No hassle, no worries!
          </p>
          <p>
            🚀 <strong>Fast & Free Shipping:</strong> Enjoy quick and free
            delivery on all orders. We ensure safe packaging and timely
            delivery.
          </p>
          <p>
            🔒 <strong>Secure Payments:</strong> We use advanced encryption to
            protect your transactions, ensuring a safe and smooth shopping
            experience.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="productdisplay"></div>
  );
};

export default Product;
