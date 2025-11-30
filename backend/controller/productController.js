import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  const file = req.file;
  // console.log(file);
  let filepath;
  if (!file) {
    filepath = null;
  } else {
    filepath = req.file.filename;
  }
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
    productImage: `http://localhost:3000/` + filepath,
  });

  return res
    .status(200)
    .json({ message: "product created successfully", Products: product });
};

export const getAllProducts = async (req, res) => {
  // res.status(200).json({ message: "I am get all products" });

  const products = await Product.find();
  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }
  res.status(200).json({ products });
};

export const getProductbyID = async (req, res) => {
  const productID = req.params.productID;
  const product = await Product.findById(productID);
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  res.status(200).json({ message: "product found", product });
};

export const updateProduct = async (req, res) => {
  const { name, description, qty, price, status } = req.body;
  const productID = req.params.productID;

  // Check if product exists
  const product = await Product.findById(productID);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Update product
  const updatedProduct = await Product.findByIdAndUpdate(
    productID,
    {
      productName: name,
      productDescription: description,
      productStockQty: qty,
      productPrice: price,
      productStatus: status,
    },
    { new: true } // return the updated document
  );

  res.status(200).json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
};

export const deleteProduct = async (req, res) => {
  const productID = req.params.productID;
  const product = await Product.findById(productID);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const result = await Product.findByIdAndDelete(productID);
  res.status(200).json({
    message: "Product deleted successfully",
    product: result,
  });
};
