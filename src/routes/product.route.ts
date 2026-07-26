import express from "express";
import authJwt from "../middleware/jwt.js";
import { getAllProduct,  createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();


router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.use(authJwt());

router.post("/", upload.single("image"), createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);


export default router;