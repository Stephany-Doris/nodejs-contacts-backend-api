import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import validateTokenHandler from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/user-profile", validateTokenHandler, getUser);

export default router;
