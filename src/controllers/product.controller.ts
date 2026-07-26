import Product from "../models/product.module.js";
import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary.js";

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
}

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity } = req.body;

    let imageUrl = "";
    if (req.file) {
      // upload buffer to cloudinary using upload_stream
      const b64 = req.file.buffer.toString("base64");// convert buffer to base64
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;// create data URI from base64 string
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "products",
      });
      imageUrl = result.secure_url;
    }
    const product = new Product({ name, price, quantity, image: imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true }); 
    if (!product){
      return res.status(404).json({ error: "Product not found" });
    };
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product){
      return res.status(404).json({ error: "Product not found" });
    }
    
    const allProduct = await Product.find()
    res.status(200).json({
      message: "Product deleted successfully",
      products: allProduct
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export { getAllProduct, getProductById, createProduct, updateProduct, deleteProduct };