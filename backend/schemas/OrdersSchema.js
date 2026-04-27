import mongoose, { Schema } from "mongoose";
import UserModel from "../model/UserModel.js";

const OrdersSchema=new Schema({
    name: String,
    qty:Number,
    price: Number,
    mode:String,
    userId: {type: Schema.Types.ObjectId, ref: "User"},
});
export default OrdersSchema;