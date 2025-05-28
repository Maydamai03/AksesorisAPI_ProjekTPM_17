import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./routes/productRoutes.js";
import transactionRoutes from "./routes/TransactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import "./models/Product.js";
import "./models/Transaction.js";
import "./models/User.js";

// Inisialisasi path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config();

const app = express();

// CORS setup (boleh akses dari mana saja, bisa difilter nanti kalau perlu)
app.use(cors({ credentials: true, origin: true }));


app.use(cookieParser());
app.use(express.json());

// Akses gambar di folder public/images
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

// API routes
app.use(productRoutes);
app.use(transactionRoutes);
app.use(userRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
