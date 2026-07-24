import express from "express";
import authJwt from "../helpers/jwt.js";
import { getAllProduct,  createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";
const router = express.Router();


router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.use(authJwt());

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);


export default router;