// routes/productRoutes.js
import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById
} from "../controllers/productController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Tidak pakai multer lagi
router.get("/products", getAllProducts);
router.post("/products", verifyToken, createProduct);
router.put("/products/:id", verifyToken, updateProduct);
router.delete("/products/:id", verifyToken, deleteProduct);
router.get("/products/:id", getProductById);

export default router;
