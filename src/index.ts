import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'; 
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

//middleware
app.use(express.json());

// Define product routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//connect to MongoDB

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

