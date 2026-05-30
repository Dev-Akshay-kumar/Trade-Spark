import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createSecretToken = (email, id) => {
  console.log("Creating token for:", email, id);
  return jwt.sign(
    { email, _id:id }, process.env.JWT_SECRET
  );
};