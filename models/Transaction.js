import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./User.js";
import Product from "./Product.js";

const { DataTypes } = Sequelize;

const Transaction = db.define("transactions", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
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
  quantity: DataTypes.INTEGER,
  total: DataTypes.INTEGER,
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending"
  }
}, {
  freezeTableName: true
});

// Relasi
User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Transaction, { foreignKey: "productId" });
Transaction.belongsTo(Product, { foreignKey: "productId" });

export default Transaction;
