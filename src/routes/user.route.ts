import express from "express";
const router = express.Router();
import { createUser, getAllUsers, getUserById } from "../controllers/user.controller.js";


router.post("/", createUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

export default router;