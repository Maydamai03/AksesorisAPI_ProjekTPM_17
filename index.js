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
app.use(cors({
  origin: true, // Atau whitelist sesuai kebutuhan
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Akses gambar di folder public/images
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

// API routes
app.use(productRoutes);
app.use(transactionRoutes);
app.use(userRoutes);

// Gunakan port dari env (Cloud Run otomatis set ini)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
