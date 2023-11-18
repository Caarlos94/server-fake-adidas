import { ProductModel } from "../models/products.model";
import { Product } from "../interfaces/interfaces";

async function getProductsDb() {
  const response = await ProductModel.find();
  return response;
}

async function getProductDb(id: string) {
  const response = await ProductModel.findOne({ _id: id });
  return response;
}

async function getCategoryProductDb(category: string) {
  const response = await ProductModel.find();
  const productsCategory = response.filter(
    (product) => product.category.toLocaleLowerCase() === category.toLowerCase()
  );
  if (productsCategory.length === 0) return "CATEGORY DO NOT EXIST";
  return productsCategory;
}

async function getProductsSellerDb() {
  const response = await ProductModel.find();
  // Crear un objeto para almacenar los productos únicos por categoría
  const productsSeller: Record<string, Product> = {};
  for (const product of response) {
    const categoryCurrent = product.category;
    // Si la categoría del producto actual no existe en el objeto de productos únicos, agregarla
    if (!productsSeller[categoryCurrent]) {
      productsSeller[categoryCurrent] = product;
    }
  }
  // Convertir el objeto de productos únicos a un arreglo
  const productsSellerArray = Object.values(productsSeller);
  return productsSellerArray;
}

export {
  getProductsDb,
  getProductDb,
  getCategoryProductDb,
  getProductsSellerDb,
};
