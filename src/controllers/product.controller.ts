import Product from "../models/product.module.js";
import type { Request, Response } from "express";

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
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
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