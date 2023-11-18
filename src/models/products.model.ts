import { Schema, model } from "mongoose";
import { Product } from "../interfaces/interfaces";

const productSchema = new Schema<Product>({
  name: String,
  keys: Array<String>,
  image: Array<String>,
  price: String,
  size: Array<String>,
  category: String,
});

const ProductModel = model("products", productSchema);

export { ProductModel };
