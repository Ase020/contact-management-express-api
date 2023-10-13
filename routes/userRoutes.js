import express from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controller/userController.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Current User
router.get("/current", currentUser);

export default router;
