import express from "express";
const router = express.Router();
import { createUser, getAllUsers, getUserById, loginUser } from "../controllers/user.controller.js";
import authJwt from "../helpers/jwt.js";


router.post("/", createUser);

router.post("/login", loginUser);

router.use(authJwt());

router.get("/", getAllUsers);

router.get("/:id", getUserById);

export default router;