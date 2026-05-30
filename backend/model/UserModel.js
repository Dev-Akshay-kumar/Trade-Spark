import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import OrdersModel from "./OrdersModel.js";
import HoldingsModel from "./HoldingsModel.js";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
});
userSchema.pre("save", async function () {

  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(
    this.password,
    12
  );
});

userSchema.post("findOneAndDelete",async(user)=>{
    await OrdersModel.deleteMany({ userId: user._id });
    await HoldingsModel.deleteMany({userId:user._id});
})


const User = mongoose.model("User", userSchema);
export default User;
