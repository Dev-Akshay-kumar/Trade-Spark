import User from "../model/UserModel.js";
import { createSecretToken } from "../util/SecretToken.js";

export const Signup = async (req, res) => {
  try {

    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing",
      });
    }

    const { email, username, password } = req.body;

    console.log(email);

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // DON'T hash here
    // pre("save") middleware will hash automatically
    const user = await User.create({
      email,
      username,
      password,
    });

    console.log("User created:", user);

    // Create JWT token
    const token = createSecretToken(
      user.email,
      user._id
    );

    // Set cookie
    res.cookie("token", token, {
      domain:'https://trade-spark-sooty.vercel.app',
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite:"none"
    });

    // Response
    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Signup failed",
    });

  }
};