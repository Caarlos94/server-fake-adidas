import { Request, Response } from "express";
import { payService } from "../services/pay.services";

async function payController(req: Request, res: Response) {
  const arrProducts = req.body;
  const response = await payService(arrProducts);
  res.status(200).json(response);
}

export { payController };
