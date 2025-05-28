// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import productRoutes from "./routes/productRoutes.js";
import transactionRoutes from "./routes/TransactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import "./models/Product.js";
import "./models/Transaction.js";
import "./models/User.js";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());

// Tidak perlu ini lagi:
// app.use('/public/images', express.static(...));

app.use(productRoutes);
app.use(transactionRoutes);
app.use(userRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
