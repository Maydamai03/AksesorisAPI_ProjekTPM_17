import express from "express";
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from "../controllers/transactionsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/transaksi", verifyToken, getAllTransactions);
router.post("/transaksi", verifyToken, createTransaction);
router.put("/transaksi/:id", verifyToken, updateTransaction);
router.delete("/transaksi/:id", verifyToken, deleteTransaction);

export default router;
