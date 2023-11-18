import { NextFunction, Request, Response } from "express";
import { checkToken } from "../utils/tokenHandler";
import { errorHandler } from "../utils/errorHandler";

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenGet = req.headers.authorization || null;
  const tokenClean = tokenGet?.split(" ").pop();
  try {
    const response = checkToken(`${tokenClean}`);
    if (response) next();
    else res.status(404).json("INVALID SESSION");
  } catch (error) {
    errorHandler(res, "ERROR IN AUTHORIZATED", error);
  }
}
