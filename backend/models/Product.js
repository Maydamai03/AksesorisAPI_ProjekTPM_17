import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

const Product = db.define("products", {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.INTEGER, // <<< UBAH INI KE DOUBLE
  image: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  freezeTableName: true
});

// Relasi
User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

export default Product;