import { Request, Response } from "express";
import { loginUserDb, registerUserDb } from "../services/users.services";
import { errorHandler } from "../utils/errorHandler";

async function register(req: Request, res: Response) {
  try {
    const response = await registerUserDb(req.body);
    if (response == "USER DO NOT CREATED")
      return res.status(404).json(response);
    res.status(200).json(response);
  } catch (error) {
    errorHandler(res, "ERROR REGISTER USER", error);
  }
}

async function login(req: Request, res: Response) {
  try {
    const response = await loginUserDb(req.body);
    if (response == "USER IS NOT REGISTER")
      return res.status(404).json(response);
    if (response == "THE PASSWORD DOES NOT MATCH")
      return res.status(404).json(response);
    return res.status(200).json(response);
  } catch (error) {
    errorHandler(res, "ERROR LOGIN USER", error);
  }
}

export { register, login };
