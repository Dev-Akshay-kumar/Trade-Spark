import User from "../model/UserModel.js";
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcryptjs";
export const Signup = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }
    const { email, username, password } = req.body;
    console.log(req.body.email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).send({ message: "User already exists" });
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        let user = await User.create({
          email,
          username,
          password: hash
        });
        console.log("User created:", user);
        // jwt token - user login session
        const token = createSecretToken(user.email,user._id);
        res.cookie("token", token);
      });
    });

    res.status(201).json({
      message: "User signed in successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
};
