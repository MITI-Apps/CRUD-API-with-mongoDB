import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.module.js";
import 'dotenv/config'; 

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

//middleware
app.use(express.json());

if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined in the environment variables");
}

mongoose.connect(MONGO_URL)
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// get all
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// get by id 
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

//updating a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body) 
    if (!product){
      return res.status(404).json({ error: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// deleting a product
app.delete("/api/products/:id", async (req, res) => {
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
})
