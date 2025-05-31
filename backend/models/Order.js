import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./User.js";
import Product from "./Product.js"; // Pastikan Product.js ada dan di-import

const { DataTypes } = Sequelize;

// Model Utama untuk Pesanan (Header Pesanan)
const Order = db.define("orders", { // Ubah nama tabel menjadi 'orders' (plural)
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  recipientName: { // Nama penerima
    type: DataTypes.STRING,
    allowNull: false
  },
  deliveryAddress: { // Alamat pengiriman
    type: DataTypes.TEXT,
    allowNull: false
  },
  currency: { // Mata uang yang dipilih
    type: DataTypes.STRING,
    allowNull: false
  },
  totalAmount: { // Total pembayaran akhir
    type: DataTypes.DOUBLE, // Gunakan DOUBLE untuk mendukung desimal
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending" // pending, completed, cancelled, etc.
  },
  orderDate: { // Tanggal pesanan dibuat
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  freezeTableName: true // Nama tabel tetap 'orders'
});

// Model untuk Item-item di dalam Pesanan (Detail Pesanan)
const OrderItem = db.define("order_items", { // Tabel baru untuk item pesanan
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  productName: { // Simpan nama produk saat pesanan dibuat (untuk histori)
    type: DataTypes.STRING,
    allowNull: false
  },
  productImageUrl: { // Simpan URL gambar produk (untuk histori)
    type: DataTypes.STRING,
    allowNull: true // Bisa null jika tidak ada gambar
  },
  pricePerUnit: { // Harga produk saat pesanan dibuat (penting!)
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subtotal: { // subtotal untuk item ini (pricePerUnit * quantity)
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  freezeTableName: true
});


// Relasi
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderItem, { foreignKey: "orderId", as: 'items' }); // 'as: items' penting untuk eager loading
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId" }); // Opsional: OrderItem belongs to Product
OrderItem.belongsTo(Product, { foreignKey: "productId" }); // Opsional: OrderItem belongs to Product

// Sinkronkan model dengan database (jika belum)
// await db.sync(); // Biasanya dilakukan di index.js atau app.js

export { Order, OrderItem }; // Export kedua model