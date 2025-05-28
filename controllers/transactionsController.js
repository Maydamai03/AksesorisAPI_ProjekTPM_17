// controllers/TransactionController.js
import Transaction from "../models/Transaction.js";

export const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.findAll({ where: { userId: req.userId } });
  res.json(transactions);
};

export const createTransaction = async (req, res) => {
  try {
    const { productId, quantity, total } = req.body;
    const newTrans = await Transaction.create({
      userId: req.userId,
      productId,
      quantity,
      total
    });
    res.status(201).json(newTrans);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { quantity, total, status } = req.body;
    await Transaction.update(
      { quantity, total, status },
      { where: { id: req.params.id, userId: req.userId } }
    );
    res.json({ message: "Transaksi berhasil diupdate" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.destroy({ where: { id: req.params.id, userId: req.userId } });
    res.json({ message: "Transaksi berhasil dihapus" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};