import Product from "../../../models/productModel.js";
import fs from "fs";

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
    productImage: process.env.Backend_URL + filepath,
  });

  return res
    .status(200)
    .json({ message: "product created successfully", Products: product });
};



export const updateProduct = async (req, res) => {
  const productID = req.params.productID;
  const { name, description, qty, price, status } = req.body;
  if (!name || !description || !qty || !price || !status) {
    return res.status(400).json({ message: "Please provide all information" });
  }
  const oldData = await Product.findById(productID);
  if (!oldData) {
    return res.status(404).json({ message: "No data found with that id" });
  }

  // const oldproductImage = oldData.productImage;
  // const lengthToCut = process.env.Backend_URL;
  // console.log("length to cut", lengthToCut);
  // const finalFilePathAfterCut = oldproductImage.slice(lengthToCut);
  // console.log("Image file name", finalFilePathAfterCut);
  const backendURL = process.env.Backend_URL;
  const oldImageFullURL = oldData.productImage; //http://localhost:3000/1764563865505-thumb-1920-1330751.jpg

  const fileName = oldImageFullURL.replace(backendURL, ""); //1764563865505-thumb-1920-1330751.jpg
  if (req.file && req.file.filename) {
    //Remove File from uploads folder
    fs.unlink("./uploads/" + fileName, (err) => {
      if (err) {
        console.log("Error deleting file", err);
      } else {
        console.log("File deleted successfully");
      }
    });
  }
  const datas = await Product.findByIdAndUpdate(
    productID,
    {
      productName: name,
      productDescription: description,
      productStockQty: qty,
      productPrice: price,
      productStatus: status,
      productImage:
        req.file && req.file.filename
          ? process.env.Backend_URL + req.file.filename
          : oldproductImage,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "Product updated successfully" }, datas);
};

export const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.productID;
    const product = await Product.findById(productID);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract filename from full URL
    const backendURL = process.env.Backend_URL; // Example: "http://localhost:3000/"
    let fileName = "";

    if (product.productImage) {
      fileName = product.productImage.replace(backendURL, "");
    }

    // Delete image if exists
    if (fileName) {
      try {
        await fs.unlink(`./uploads/${fileName}`);
        console.log("Image deleted:", fileName);
      } catch (err) {
        console.log("Failed to delete image:", err.message);
      }
    }

    // Delete product from DB
    const result = await Product.findByIdAndDelete(productID);

    return res.status(200).json({
      message: "Product deleted successfully",
      product: result,
    });
  } catch (error) {
    console.log("Error deleting product:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
