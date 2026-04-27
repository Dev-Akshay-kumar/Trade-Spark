import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import HoldingsModel from "./model/HoldingsModel.js";
import PositionsModel from "./model/PositonsModel.js";
import OrdersModel from "./model/OrdersModel.js";
import authRoute from "./routes/AuthRoute.js";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;


// 🧩 Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// 🚏 Routes
app.use("/", authRoute);

// ================= AUTH MIDDLEWARE =================
 function isLoggedIn(req, res, next) {
  try {
    const token = req.cookies?.token;
    console.log("Checking login status with token:", token);

    if (!token) {
      return res.status(401).json({
        message: "You have to login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

app.get("/allHoldings", isLoggedIn, async (req, res) => {
  console.log("User info from token:", req.user);
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", isLoggedIn, async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/orders", isLoggedIn, async (req, res) => {
  try {
    const orders = await OrdersModel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});


app.post("/newOrder", isLoggedIn, async (req, res) => {
  const { name, qty, price, mode } = req.body;

  if (mode === "SELL") {
    const holding = await HoldingsModel.findOne({ name:name });

    if (!holding) {
      return res.status(400).json({
        error: "Stock not available in holdings",
      });
    }

    if (holding.qty < qty) {
      return res.status(400).json({
        error: "Not enough quantity to sell",
      });
    }

    holding.qty -= qty;
    await holding.save();
  }
  console.log("Creating order for user:", req.user._id);

  const newOrder = new OrdersModel({
    userId: req.user._id,
    name,
    qty,
    price,
    mode,
  });

  await newOrder.save();
  res.send("order saved");
});


// 🔌 Database connection
const connectDb = async () => {
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log("Database connected successfully ✅");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("Database connection failed ❌");
    console.error(error.message);
    process.exit(1);
  }
};

connectDb();
