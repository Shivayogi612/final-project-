import { v2 as cloudinary } from 'cloudinary';
import productModel from "../models/productModel.js";

// Function to add product
const addProduct = async (req, res) => {
    try {
        // Extracting product details from req.body
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Extracting images safely
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        // Filter out undefined images
        const images = [image1, image2, image3, image4].filter(Boolean);

        // Upload images to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' }); // Fixed typo
                return result.secure_url; // Get the uploaded image URL
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        };

        console.log(productData);
        
        const product = new productModel(productData);
        await product.save();
        
        res.status(201).json({ success: true, message: "Product Added" });

    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to list products
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error in listProduct:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to remove a product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in removeProduct:", error);
        res.json({ success: false, message: error.message });
    }
};

// Function to get single product details
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.error("Error in singleProduct:", error);
        res.json({ success: false, message: error.message });
    }
};

// Exporting functions
export { addProduct, listProduct, removeProduct, singleProduct };
