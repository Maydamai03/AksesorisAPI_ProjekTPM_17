// controllers/UserController.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hash });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Password salah" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d"
  });

  res.json({
  token,
  email: user.email,
  name: user.name,
  role: user.role });
};