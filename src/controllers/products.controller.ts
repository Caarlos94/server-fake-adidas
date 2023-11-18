import { Request, Response } from "express";
import {
  getProductDb,
  getProductsDb,
  getCategoryProductDb,
  getProductsSellerDb,
} from "../services/products.services";
import { errorHandler } from "../utils/errorHandler";

async function getProducts(req: Request, res: Response) {
  try {
    const response = await getProductsDb();
    res.status(200).json(response);
  } catch (error) {
    errorHandler(res, "ERROR GET PRODUCTS", error);
  }
}

async function getProduct(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const response = await getProductDb(id);
    res.status(200).json(response);
  } catch (error) {
    errorHandler(res, "ERROR GET PRODUCT", error);
  }
}

async function getCategoryProduct(req: Request, res: Response) {
  const { category } = req.params;
  try {
    const response = await getCategoryProductDb(category);
    if (response === "CATEGORY DO NOT EXIST")
      return res.status(404).json(response);
    res.status(200).json(response);
  } catch (error) {
    errorHandler(res, "ERROR GET CATEGORY PRODUCT", error);
  }
}

async function getBestProduct(req: Request, res: Response) {
  try {
    const response = await getProductsSellerDb();
    if (response) res.status(200).json(response);
    else {
      res.status(404).send("ERROR GET BEST SELLERS");
    }
  } catch (error) {
    errorHandler(res, "ERROR GET BEST SELLERS", error);
  }
}

/* RUTA PROTEGIDA PARA PERSONAS CON SESION ACTIVA */
async function getProfileProducts(req: Request, res: Response) {
  try {
    const response = await getProductsSellerDb();
    if (response) res.status(200).json(response);
    else {
      res.status(404).send("ERROR GET BEST SELLERS");
    }
  } catch (error) {
    errorHandler(res, "ERROR GET BEST SELLERS", error);
  }
}

export {
  getProducts,
  getProduct,
  getCategoryProduct,
  getBestProduct,
  getProfileProducts,
};
