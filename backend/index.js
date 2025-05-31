// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js"; // <<< Import instance database
import { Order, OrderItem } from "./models/Order.js"; // <<< Import model Order dan OrderItem
import Product from "./models/Product.js"; // <<< Import model Product
import User from "./models/User.js"; // <<< Import model User

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());

// Tidak perlu ini lagi:
// app.use('/public/images', express.static(...));

app.use(productRoutes);
app.use(orderRoutes);
app.use(userRoutes);

// --- Bagian PENTING: Koneksi dan Sinkronisasi Database ---
(async () => {
  try {
    await db.authenticate();
    console.log('Database connected...');
    // Sinkronkan semua model. Hati-hati dengan { force: true } di production!
    // { force: true } akan MENGHAPUS dan MEMBUAT ULANG tabel setiap kali server restart.
    // Gunakan ini HANYA di tahap DEVELOPMENT.
    // Untuk production, gunakan `db.sync({ alter: true })` atau migrasi.
    await User.sync();
    await Product.sync();
    await Order.sync(); // Sinkronkan model Order
    await OrderItem.sync(); // Sinkronkan model OrderItem
    console.log('All models synchronized with database.');
  } catch (error) {
    console.error('Unable to connect to the database or synchronize models:', error);
  }
})();
// --- Akhir Bagian PENTING ---

app.listen(5000, () => console.log("Server running on http://localhost:5000"));