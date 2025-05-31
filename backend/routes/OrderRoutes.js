import express from "express";
import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/OrderController.js";
import { verifyToken } from "../middleware/verifyToken.js"; // Asumsi ada middleware ini

const router = express.Router();

// Gunakan verifyToken untuk semua rute yang membutuhkan otentikasi
router.get("/orders", verifyToken, getAllOrders);
router.post("/orders", verifyToken, createOrder); // Rute baru untuk membuat pesanan
router.patch("/orders/:id", verifyToken, updateOrder); // Update status pesanan
router.delete("/orders/:id", verifyToken, deleteOrder);

export default router;