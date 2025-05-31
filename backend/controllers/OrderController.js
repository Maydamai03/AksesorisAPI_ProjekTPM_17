
import { Order, OrderItem } from "../models/Order.js";
import Product from "../models/Product.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.userId },
      include: [{
        model: OrderItem,
        as: 'items',
        // Tambahkan 'productId' ke attributes
        attributes: ['productId', 'productName', 'productImageUrl', 'pricePerUnit', 'quantity', 'subtotal'] // <<< UBAH BARIS INI
      }],
      order: [['orderDate', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bagian createOrder, updateOrder, deleteOrder tidak perlu diubah karena sudah benar
// ... (createOrder, updateOrder, deleteOrder functions)

export const createOrder = async (req, res) => {
  try {
    const { recipientName, deliveryAddress, currency, totalAmount, products } = req.body; // 'products' adalah array dari item keranjang

    // Validasi input dasar
    if (!recipientName || !deliveryAddress || !currency || totalAmount === undefined || !products || products.length === 0) {
      return res.status(400).json({ message: "Data pesanan tidak lengkap." });
    }

    // Buat pesanan utama (header)
    const newOrder = await Order.create({
      userId: req.userId,
      recipientName,
      deliveryAddress,
      currency,
      totalAmount,
      status: "pending" // Default status
    });

    // Buat item-item pesanan (detail)
    const orderItems = products.map(p => ({
      orderId: newOrder.id,
      productId: p.id, // ID produk dari frontend
      productName: p.name, // Nama produk dari frontend
      productImageUrl: p.imageUrl, // URL gambar dari frontend
      pricePerUnit: p.pricePerUnit, // Harga per unit dari frontend
      quantity: p.quantity,
      subtotal: p.pricePerUnit * p.quantity // Hitung subtotal di backend juga untuk keamanan
    }));

    await OrderItem.bulkCreate(orderItems); // Simpan semua item pesanan sekaligus

    // Ambil pesanan lengkap dengan item-itemnya untuk respons
    const orderWithItems = await Order.findByPk(newOrder.id, {
      include: [{
        model: OrderItem,
        as: 'items',
        attributes: ['productName', 'productImageUrl', 'pricePerUnit', 'quantity', 'subtotal']
      }]
    });

    res.status(201).json(orderWithItems);
  } catch (err) {
    console.error("Error creating order:", err); // Log error untuk debugging
    res.status(400).json({ error: err.message });
  }
};

// Update dan Delete Order mungkin perlu disesuaikan juga jika Anda ingin mengelola OrderItem
// Untuk saat ini, saya biarkan seperti ini, tapi perlu diperhatikan.
export const updateOrder = async (req, res) => {
  try {
    const { status } = req.body; // Hanya izinkan update status dari frontend
    await Order.update(
      { status },
      { where: { id: req.params.id, userId: req.userId } }
    );
    res.json({ message: "Status pesanan berhasil diupdate" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    // Saat menghapus Order, pastikan OrderItem juga terhapus (cascade delete di Sequelize)
    // Atau hapus OrderItem secara manual terlebih dahulu
    await Order.destroy({ where: { id: req.params.id, userId: req.userId } });
    res.json({ message: "Pesanan berhasil dihapus" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};