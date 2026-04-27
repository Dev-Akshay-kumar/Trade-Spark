import OrdersSchema from "../schemas/OrdersSchema.js";
import { model } from "mongoose";
const OrdersModel= new model("Order",OrdersSchema);

export default OrdersModel;