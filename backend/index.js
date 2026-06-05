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
import User from "./model/UserModel.js";
import dns from 'dns';


dotenv.config();
const app = express();

dns.setServers(["1.1.1.1","8.8.8.8"]);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;



// 🧩 Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "https://trade-spark-sooty.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
});

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

app.get("/me", isLoggedIn, async (req, res) => {
  console.log(req.user);
  const userdata = await User.findOne({
    email: req.user.email,
  });

  console.log(userdata);
  res.status(200).json({
    isLoggedIn: true,
    user: req.user,
    username: userdata.username
  });

});


app.get("/allHoldings", isLoggedIn, async (req, res) => {
  try {
    console.log("User info from token:", req.user);
    const allHoldings = await HoldingsModel.find({
      userId: req.user._id,
    });
    res.json({
      success: true,
      data: allHoldings,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/allPositions", isLoggedIn, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({
      userId: req.user._id,
    });

    res.json({
      success: true,
      data: allPositions,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/orders", isLoggedIn, async (req, res) => {
  try {

    const orders = await OrdersModel.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


app.post("/newOrder", isLoggedIn, async (req, res) => {
  try {

    const { name, qty, price, mode, net, avg, day, percent, isDown } = req.body;
    console.log(req.body);
    // SELL Logic
    if (mode === "SELL") {

      const holding = await HoldingsModel.findOne({
        name,
        userId: req.user._id,
      });

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

      if (holding.qty === 0) {
        await HoldingsModel.findByIdAndDelete(
          holding._id
        );
      } else {
        await holding.save();
      }
    }

    // Create Order
    const newOrder = new OrdersModel({
      userId: req.user._id,
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();

    if (mode === "BUY") {
      let holding = await HoldingsModel.findOne({
        name,
        userId: req.user._id,
      });

      if (holding) {
        holding.qty += qty;
        holding.price = price;
        await holding.save();
      } else {
        await HoldingsModel.create({
          name,
          qty,
          price,
          avg,
          net,
          day,
          userId: req.user._id,
        });
      }
    }


    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      order: newOrder,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});

async function connectDb(uri) {
  try {
    await mongoose.connect(uri, {
  serverSelectionTimeoutMS: 10000,
  family: 4,
});

    console.log("Database connected successfully ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
  console.error("Database connection failed ❌");
  console.error(err.message);
  console.error(err);
}
}

connectDb(uri);