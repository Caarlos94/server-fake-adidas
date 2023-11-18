import { Router } from "express";
import {
  getBestProduct,
  getCategoryProduct,
  getProduct,
  getProducts,
  getProfileProducts,
} from "../controllers/products.controller";
import validateToken from "../middleware/sesion";

const router = Router();

router.get("/", getProducts);
router.get("/seller", getBestProduct);
router.get("/profile", validateToken, getProfileProducts);
router.get("/:id", getProduct);
router.get("/category/:category", getCategoryProduct);

export { router };
