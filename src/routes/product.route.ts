import express from "express";
import authJwt from "../middleware/jwt.js";
import { getAllProduct,  createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import upload from "../middleware/upload.js";
import validate from "../middleware/validate.js";
import { createProductSchema, updateProductSchema } from "../validation/product.validation.js";

const router = express.Router();


router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.post("/", authJwt(), upload.single("image"), validate(createProductSchema), createProduct);

router.put("/:id", authJwt(), validate(updateProductSchema), updateProduct);

router.delete("/:id", authJwt(), deleteProduct);


export default router;