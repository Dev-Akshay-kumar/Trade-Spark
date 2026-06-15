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
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
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

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // create jwt token--sending payloads
  const token = createSecretToken(existingUser.email, existingUser._id);

 // set cookie first
    res.cookie("token", token, {
      domain:'https://trade-spark-sooty.vercel.app',
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite:"none"
    });

    // send response once
    res.status(201).json({
      message: "Signup successful",
      success: true,
      user:existingUser
    });

});

export default router;