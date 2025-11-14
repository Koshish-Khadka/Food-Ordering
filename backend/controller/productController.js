import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, qty, price, status } = req.body;
    if (!name || !description || !qty || !price || !status) {
      return res.status(403).json({ message: "All fields are required" });
    }
    const product = await Product.create({
      productName: name,
      productDescription: description,
      productStockQty: qty,
      productPrice: price,
      productStatus: status,
    });

    return res
      .status(200)
      .json({ message: "product created successfully", Products: product });
  } catch (error) {
    console.log("Failed to create Product", error);
    return res.status(500).json({
      message: "Server error while creating product",
      error: error.message,
    });
  }
};
