import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.module.js";


const app = express();
const PORT = 3000;
//mongodb://okekem186_db_user:UZsz0oAN3aEVhR9l@ac-ijvreel-shard-00-00.kwihesd.mongodb.net:27017,ac-ijvreel-shard-00-01.kwihesd.mongodb.net:27017,ac-ijvreel-shard-00-02.kwihesd.mongodb.net:27017/?ssl=true&replicaSet=atlas-ip8oxl-shard-0&authSource=admin&appName=MongoLearning

//middleware
app.use(express.json());

mongoose.connect("mongodb://okekem186_db_user:UZsz0oAN3aEVhR9l@ac-ijvreel-shard-00-00.kwihesd.mongodb.net:27017,ac-ijvreel-shard-00-01.kwihesd.mongodb.net:27017,ac-ijvreel-shard-00-02.kwihesd.mongodb.net:27017/?ssl=true&replicaSet=atlas-ip8oxl-shard-0&authSource=admin&appName=MongoLearning")
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
