import { Router } from "express";
import { Signup } from "../controllers/AuthController.js";
import User from "../model/UserModel.js";
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcryptjs";

const router = Router();

// signup route
router.post("/signup", Signup);

// logout route
router.get("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: "User logged out successfully" });
});


// login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  
  const existingUser = await User.findOne({ email });
  console.log(existingUser);
  

  if (!existingUser) {
    return res.status(401).json({ message: "User not registered" });
  }

  const isMatch = bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // create jwt token
  const token = createSecretToken(existingUser.email, existingUser._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({
    message: "Login successful",
    isLoggedIn: true,
    user: existingUser
  });
});

export default router;