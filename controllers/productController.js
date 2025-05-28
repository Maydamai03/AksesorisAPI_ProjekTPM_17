// controllers/ProductController.js
import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file?.filename || null;
    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
      userId: req.userId
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file?.filename;
    const updateData = { name, description, price };
    if (image) updateData.image = image;
    await Product.update(updateData, { where: { id: req.params.id, userId: req.userId } });
    res.json({ message: "Produk berhasil diupdate" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id, userId: req.userId } });
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
