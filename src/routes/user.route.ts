import express from "express";
const router = express.Router();
import { createUser, getAllUsers, getUserById, loginUser } from "../controllers/user.controller.js";
import authJwt from "../middleware/jwt.js";
import validate from "../middleware/validate.js";
import { createUserSchema, loginUserSchema } from "../validation/user.validation.js";

router.post("/", validate(createUserSchema), createUser);

router.post("/login", validate(loginUserSchema), loginUser);


router.get("/", authJwt(), getAllUsers);

router.get("/:id", authJwt(), getUserById);

export default router;