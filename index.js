import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import transactionRoutes from "./routes/TransactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import "./models/Product.js";
import "./models/Transaction.js";
import "./models/User.js";

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5000' }));
app.use(cookieParser());
app.use(express.json());

// Biar folder public/images bisa diakses untuk image yang diupload multer
app.use('/public/images', express.static(path.join(path.resolve(), 'public/images')));

// Mount route
app.use(productRoutes);
app.use(transactionRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:5000`));
