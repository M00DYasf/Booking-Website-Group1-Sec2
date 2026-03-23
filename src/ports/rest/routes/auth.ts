import express from "express";
import dependencies from "../../../infrastructure/dependencies";
import { register, login } from "../../../controllers/auth";

const router = express.Router();

// POST /auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await register(dependencies)({ name, email, password, role });
    res.status(201).json({ 
      message: "User registered successfully", 
      user: {
        id: result._id,
        name: result.name,
        email: result.email,
        role: result.role
      }
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(dependencies)({ email, password });
    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

export default router;