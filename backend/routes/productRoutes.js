import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
    getProductById
} from "../controllers/productController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "public/images" });

router.get("/products", getAllProducts);
router.post("/products", verifyToken, upload.single("image"), createProduct);
router.put("/products/:id", verifyToken, upload.single("image"), updateProduct);
router.delete("/products/:id", verifyToken, deleteProduct);
router.get("/products/:id", getProductById);


export default router;
